let loaderref = ''

// Function to set the reference to the loader component
const setLoaderRef = (ref) => {
    loaderref = ref;
}

// Function to show or hide the loader
const isShowLoader = (show) => {
    loaderref.showLoader(show);
}


export default {
    setLoaderRef,
    isShowLoader
}