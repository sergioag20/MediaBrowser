﻿(function ($, document, window) {

    function loadPage(page, config) {

        $('#chkMovies', page).checked(config.EnableIntrosForMovies).checkboxradio('refresh');
        $('#chkEpisodes', page).checked(config.EnableIntrosForEpisodes).checkboxradio('refresh');

        $('#chkMyMovieTrailers', page).checked(config.EnableIntrosFromMoviesInLibrary).checkboxradio('refresh');
        $('#chkUpcomingTheaterTrailers', page).checked(config.EnableIntrosFromUpcomingTrailers).checkboxradio('refresh');

        $('#chkUnwatchedOnly', page).checked(!config.EnableIntrosForWatchedContent).checkboxradio('refresh');
        $('#chkEnableParentalControl', page).checked(config.EnableIntrosParentalControl).checkboxradio('refresh');

        Dashboard.hideLoadingMsg();
    }

    $(document).on('pageshow', "#cinemaModeConfigurationPage", function () {

        Dashboard.showLoadingMsg();

        var page = this;

        ApiClient.getNamedConfiguration("cinemamode").done(function (config) {

            loadPage(page, config);

        });

    });

    function cinemaModeConfigurationPage() {

        var self = this;

        self.onSubmit = function () {
            Dashboard.showLoadingMsg();

            var form = this;

            var page = $(form).parents('.page');

            ApiClient.getNamedConfiguration("cinemamode").done(function (config) {

                config.EnableIntrosForMovies = $('#chkMovies', page).checked();
                config.EnableIntrosForEpisodes = $('#chkEpisodes', page).checked();
                config.EnableIntrosFromMoviesInLibrary = $('#chkMyMovieTrailers', page).checked();
                config.EnableIntrosFromUpcomingTrailers = $('#chkUpcomingTheaterTrailers', page).checked();
                config.EnableIntrosForWatchedContent = !$('#chkUnwatchedOnly', page).checked();
                config.EnableIntrosParentalControl = $('#chkEnableParentalControl', page).checked();


                ApiClient.updateNamedConfiguration("cinemamode", config).done(Dashboard.processServerConfigurationUpdateResult);
            });

            // Disable default form submission
            return false;
        };
    }

    window.CinemaModeConfigurationPage = new cinemaModeConfigurationPage();

})(jQuery, document, window);