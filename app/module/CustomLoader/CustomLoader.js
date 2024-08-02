import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Config from '../../config';

// custom loader component
export default class CustomLoader extends Component {

    // Initialize the state
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
        }
    }

    // Method to show or hide the loader
    showLoader = (show) => {
        this.setState({
            isVisible: show,
        })
    }

    // Render method
    render() {
        if (!this.state.isVisible) {
            return null
        }

        return (
            <View style={styles.containerView}>
                <View style={styles.loaderView}>
                    <ActivityIndicator size="large" color={Config.AppColors.COLOR_WHITE} />
                </View>
            </View>
        )

    }
}

// Styles for the component
const styles = StyleSheet.create({
    containerView: {
        ...StyleSheet.absoluteFill,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Config.AppColors.COLOR_TRASPARENT,

    },
    loaderView: {
        padding: 25,
        elevation: 10,
        backgroundColor: Config.AppColors.COLOR_PRIMARY,
        borderRadius: 20,
        shadowColor: Config.AppColors.COLOR_BLACK,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    }

})