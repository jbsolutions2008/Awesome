import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import CustomHeader from "../components/CustomHeader";
import TodoMessagePopup, { TodoMessagePopupProps } from "../components/TodoMessagePopup";
import config from "../config";
import AppColors from "../config/colors";
import AppFonts from "../config/fonts";
import normalize from "../config/normalize";
import { TOAST_TYPES } from "../config/enum";
import Toast from "react-native-toast-message";
import utils from "../utils";
import MessagePopup, { MessagePopupProps } from "../components/MessagePopup";
import { useTheme } from "@react-navigation/native";

type RootStackParamList = {
    TodoList: {};
};
type Props = NativeStackScreenProps<RootStackParamList, 'TodoList'>; // Props type for navigation and route parameters.

const TodoList = ({ route, navigation }: Props) => {

    const { colors } = useTheme();

    const [todoData, setTodoData] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
    const [isPopupVisibleLogout, setPopupVisibleLogout] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [todoTitle, setTodoTitle] = useState<any>('');
    const [customPopupProps, setCustomPopupProps] = useState<TodoMessagePopupProps>({
        id: 0,
        title: '',
        message: '',
    }); // State for storing custom popup properties.
    const [customPopupLogoutProps, setCustomLogoutPopupProps] = React.useState<MessagePopupProps>({
        title: '',
        message: '',
    });  // State for storing logout popup properties.

    // Effect to update api call function
    useEffect(() => {
        fetchInitialTodos();
    }, []);

    // fetch pagination data
    const fetchInitialTodos = async () => {
        setLoading(true);
        try {
            const initialTodos: any = await todoList(page);
            setTodoData(initialTodos);
        } finally {
            setLoading(false);
        }
    };

    //function for listing Api call
    const todoList = async (page: number) => {
        setLoading(true);
        const data = await config.ApiServices.GetApiCall(
            config.ApiEndpoints.todos + '?_limit=' + `${config.Constants.pagination.perPageLimit}` + '&page=' + `${page}`, {}, false)
        setLoading(false);
        return data;
    }

    // footer loader
    const renderFooter = () => {
        if (!hasMore) return null;
        return (
            <View style={styles.footer}>
                {loading ? <ActivityIndicator size="large" color={colors.primary} /> : null}
            </View>
        );

    };

    // fetch more data
    const fetchMore = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        const nextPage = page + 1;
        const newTodos: any = await todoList(nextPage);

        if (newTodos.length === 0) {
            setHasMore(false);
        } else {
            setTodoData((prevTodos: any) => [...prevTodos, ...newTodos]);
            setPage(nextPage);
        }
        setLoading(false);
    };

    // data display Ui design
    const _renderTodoItem = ({ item, index }: { item: any, index: number }) => {

        return (
            <TouchableOpacity onPress={() => updateTodoTitle(item)}>
                <View style={styles.item}>
                    <Text style={[styles.title, { color: colors.primary }]}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )

    }

    // pass data to custom dialog
    const updateTodoTitle = (item: any) => {
        setTodoTitle(item?.title)
        const messageStyles: TodoMessagePopupProps = {
            id: item?.id,
            title: item,
            message: item?.title,
        }
        setCustomPopupProps(messageStyles);
        todoMessagePopup()
    }

    // on back press
    const onBackPress = () => {
        navigation.pop();
    }

    // popup open
    const todoMessagePopup = () => {
        setPopupVisible(!isPopupVisible);
    }

    // function for update list API
    const onTodoSubmit = async (todoItem: string) => {

        const payload = {
            title: todoItem
        }

        const data = await config.ApiServices.PostApiCall(config.ApiEndpoints.todos + `/${todoItem?.id}`, JSON.stringify(payload), {}, false)
        if (data) {
            Toast.show({
                type: 'customToast',
                props: {
                    type: TOAST_TYPES.success,
                    message: 'Sucessfully update title.'
                }
            });
            setTodoData((prevTodos: any[]) =>
                prevTodos.map((todo) =>
                    todo.id === todoItem?.id ? todoItem : todo
                )
            );
        }
    }

    // logout message popup open
    const logoutMessagePopup = () => {
        setCustomLogoutPopupProps({
            title: t('Logout'),
            message: t('LogoutConfirmationMessage')
        })
        popupToggle();
    }

    // open pupup
    const popupToggle = () => {
        setPopupVisibleLogout(!isPopupVisibleLogout);
    }

    // logout confirmation and clear all asybc storage data
    const onLogoutConfirmationPress = () => {
        utils.MethodUtils.clearData(navigation);
    }

    // todo list title on change
    const titleTextChange = (value: any) => {
        setTodoTitle(value)
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <CustomHeader
                title={t('TodoList')}
                onLeftButtonPress={onBackPress}
                rightImage={config.images.icons.logout}
                rightImageStyle={[styles.headerRightImage, { tintColor: colors.background }]}
                mainContainer={{ backgroundColor: colors.primary }}
                titleStyle={{ color: colors.background }}
                safeAreaStyle={{ backgroundColor: colors.primary }}
                statusBarContainerStyle={[styles.satusBarColor, { backgroundColor: colors.primary }]}
                onRightButtonPress={logoutMessagePopup}
            />
            <FlatList
                data={todoData}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                renderItem={_renderTodoItem}
                ListFooterComponent={renderFooter}
                onEndReached={fetchMore}
                onEndReachedThreshold={0.1}
            />
            <TodoMessagePopup
                title={t('updateTitle')}
                setTodoText={titleTextChange}
                todoText={todoTitle}
                message={''}
                isVisible={isPopupVisible}
                setVisible={todoMessagePopup}
                onOkButtonPress={() => {
                    onTodoSubmit(customPopupProps?.title);
                }}
                okButtonTitle={t('Yes')}
                cancelButtonTitle={t('No')} />

            <MessagePopup
                title={customPopupLogoutProps.title}
                message={customPopupLogoutProps.message}
                isVisible={isPopupVisibleLogout}
                setVisible={popupToggle}
                onOkButtonPress={onLogoutConfirmationPress}
                okButtonTitle={t('Yes')}
                cancelButtonTitle={t('No')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    satusBarColor: {
        backgroundColor: AppColors.COLOR_PRIMARY
    },
    footer: {
        padding: 20,
        alignItems: 'center',
    },
    item: {
        padding: 10,
        marginVertical: 8,
        borderColor: '#ddd',
        borderBottomWidth: 1,
    },
    title: {
        fontSize: normalize(16),
        fontFamily: AppFonts.FiraCodeRegular,
    },
    headerRightImage: {
        height: normalize(30),
        width: normalize(30),
    },
})

export default TodoList;