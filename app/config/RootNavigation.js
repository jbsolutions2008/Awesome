import { createNavigationContainerRef, StackActions } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

// navigate to a specific screen
// checks if the navigation container is ready before attempting to navigate
export function navigate(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

// push a new screen onto the stack
// allows for pushing new screens onto the navigation stack
export function push(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.current?.dispatch(StackActions.push(name, params));
    }
}