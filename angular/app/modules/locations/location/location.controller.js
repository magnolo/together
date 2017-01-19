class LocationController {
    constructor(LocationService, $document, $state, $scope) {
        'ngInject';

        this.$document = $document;
        this.$state = $state;
        this.$scope = $scope;
        this.LocationService = LocationService;
        this.location;

        // Data
        this.taToolbar = [
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote', 'bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'html', 'insertImage', 'insertLink', 'insertVideo', 'wordcount', 'charcount']
        ];

        this.LocationService.get(this.$state.params.id).then((data) => {
            this.location = data;

            if (this.location.images.length > 0) {
                this.updateImageZoomOptions(this.location.images[0].url);
            }
        });
        this.LocationService.getTypes().then((data) => {
            this.types = data;
        });

        this.categoriesSelectFilter = '';

        this.ngFlow = {
            // ng-flow will be injected into here through its directive
            flow: {}
        };
        this.dropping = false;
        this.imageZoomOptions = {};

        this.ngFlowOptions = {
            // You can configure the ngFlow from here
            target: 'api/locations/' + this.$state.params.id + '/images',
            chunkSize: 15 * 1024 * 1024,
            maxChunkRetries: 1,
            simultaneousUploads: 1,
            testChunks: false,
            progressCallbacksInterval: 1000
        };

    }

    /**
     * Save location
     */
    saveLocation() {
        // Since we have two-way binding in place, we don't really need
        // this function to update the locations array in the demo.
        // But in real world, you would need this function to trigger
        // an API call to update your database.
        // if (this.location.id) {
        //     eCommerceService.updateLocation(this.location.id, this.location);
        // } else {
        //     eCommerceService.createLocation(this.location);
        // }

    }


    /**
     * Go to locations page
     */
    gotoLocations() {
        this.$state.go('app.locations');
    }

    /**
     * On categories selector open
     */
    onCategoriesSelectorOpen() {
        // The md-select directive eats keydown events for some quick select
        // logic. Since we have a search input here, we don't need that logic.
        this.$document.find('md-select-header input[type="search"]').on('keydown', (e) => {
            e.stopPropagation();
        });
    }

    /**
     * On categories selector close
     */
    onCategoriesSelectorClose() {
        // Clear the filter
        this.categoriesSelectFilter = '';

        // Unbind the input event
        this.$document.find('md-select-header input[type="search"]').unbind('keydown');
    }

    /**
     * File added callback
     * Triggers when files added to the uploader
     *
     * @param file
     */
    fileAdded(file) {
        // Prepare the temp file data for media list
        var uploadingFile = {
            id: file.uniqueIdentifier,
            file: file,
            type: 'uploading',
            location: this.location.id
        };

        // Append it to the media list
        this.location.images.unshift(uploadingFile);
    }

    /**
     * Upload
     * Automatically triggers when files added to the uploader
     */
    upload() {
        // Set headers
        this.ngFlow.flow.opts.headers = {
            'X-Requested-With': 'XMLHttpRequest',
            //'X-XSRF-TOKEN'    : $cookies.get('XSRF-TOKEN')
        };

        this.ngFlow.flow.upload();
    }

    /**
     * File upload success callback
     * Triggers when single upload completed
     *
     * @param file
     * @param message
     */
    fileSuccess(file, message) {
        // Iterate through the media list, find the one we
        // are added as a temp and replace its data
        // Normally you would parse the message and extract
        // the uploaded file data from it
        angular.forEach(this.location.images, (media, index) => {
            if (media.id === file.uniqueIdentifier) {
                // Normally you would update the media item
                // from database but we are cheating here!
                var fileReader = new FileReader();
                fileReader.readAsDataURL(media.file.file);
                fileReader.onload = (event) => {
                    media.url = event.target.result;
                };

                // Update the image type so the overlay can go away
                media.type = 'image';
            }
        });
    }

    /**
     * Checks if the given form valid
     *
     * @param formName
     */
    isFormValid(formName) {
        if (this.$scope[formName] && this.$scope[formName].$valid) {
            return this.$scope[formName].$valid;
        }
    }

    /**
     * Update image zoom options
     *
     * @param url
     */
    updateImageZoomOptions(url) {
        this.imageZoomOptions = {
            images: [{
                thumb: url,
                medium: url,
                large: url
            }]
        };
    }
}

export { LocationController };