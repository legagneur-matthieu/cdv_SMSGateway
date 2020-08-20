$dwf = new (function () {

    this.isInit = false;
    this.init = function (theme = "") {
        if (!this.isInit) {
            var css = [
                "dwf/dist/jquery-ui/jquery-ui.min.css",
                "dwf/dist/jquery-ui/jquery-ui.structure.min.css",
                "dwf/dist/jquery-ui/jquery-ui.theme.min.css",
                "dwf/dist/css/bootstrap.min.css",
                "dwf/dist/css/bootstrap-theme.min.css",
                "dwf/style.css",
                "dwf/pxtoem.css"
            ];
            var js = [
                "dwf/dist/jquery-ui/jquery-ui.min.js",
                "dwf/dist/js/bootstrap.min.js",
                "dwf/phpjs/phpjs.min.js",
                "dwf/js.js"
            ];
            css.forEach(function (file) {
                $dwf.include_link(file);
            });
            js.forEach(function (file) {
                $dwf.include_script(file);
            });

    }


    };

    /**
     * Inclut un fichier JS
     * @param {string} src Source du JS
     * @returns {undefined}
     */
    this.include_script = function (src) {
        $("head").append('<script type="text/javascript" src="' + src + '"></script>');
    };

    /**
     * Inclut un fichier CSS
     * @param {string} href Lien du CSS
     * @returns {undefined}
     */
    this.include_link = function (href) {
        $("head").append('<link rel="stylesheet" href="' + href + '" />');
    };

    this.dwf_js_called = false;

    /**
     * Retourne un objet de gestion de formulaire (require une balise form avec un id)
     * @param {string} id Id CSS de la balise form
     * @returns {dwf_form}
     */
    this.js = function () {
        if (!this.dwf_js_called) {
            this.include_script("dwf/dwf_js.js");
            this.dwf_js_called = new dwf_js();
        }
        return this.dwf_js_called;
    };

    this.dwf_form_called = false;

    /**
     * Retourne un objet de gestion de formulaire (require une balise form avec un id)
     * @param {string} id Id CSS de la balise form
     * @returns {dwf_form}
     */
    this.form = function (id) {
        if (!this.dwf_form_called) {
            this.include_script("dwf/dwf_form.js");
            this.dwf_form_called = true;
        }
        return new dwf_form(id);
    };
    ;
    this.dwf_time_called = false;

    /**
     * Retourne un objet contenant des fonctions basiques qui gère le temps
     * 
     * @returns {dwf_time}
     */
    this.time = function () {
        if (this.dwf_time_called === false) {
            this.include_script("dwf/dwf_time.js");
            this.dwf_time_called = new dwf_time();
        }
        return this.dwf_time_called;
    };

    this.dwf_math_called = false;

    /**
     * Retourne un objet contenant des fonctions mathématiques
     * @returns {dwf_math}
     */
    this.math = function () {
        if (this.dwf_math_called === false) {
            this.include_script("dwf/dwf_math.js");
            this.dwf_math_called = new dwf_math();
        }
        return this.dwf_math_called;

    };

    this.dwf_trad_called = false;

    /**
     * Retourne objet de traduction
     * @param {string} lang Langue de traduction
     * @returns {dwf_trad}
     */
    this.trad = function (lang) {
        if (this.dwf_trad_called === false) {
            this.include_script("dwf/dwf_trad.js");
            this.dwf_trad_called = new dwf_trad(lang);
        }
        return this.dwf_trad_called;
    };
    $_get = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        $_get[key] = value;
    });
})