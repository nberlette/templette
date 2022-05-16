export default class Templette {
    #template = '';
    /**
     * Construct a new Templette instance from a template string.
     *
     * @param {Template} template - the raw template string we render with
     */
    constructor(template) {
        this.template = template;
        return this;
    }
    /**
     * Render the template with provided values.
     *
     * @param {Values} values
     * @returns {string}
     */
    render(values) {
        return Templette.compile(this.template, values);
    }
    /**
     * Templette's main compile method, powered by JavaScript's powerful builtin RegExp engine.
     *
     * @example Templette.compile ('Hello {{name}}!', { name: 'Nick' })
     * // Hello Nick!
     * @param {Template} template - the raw template string we want to compile
     * @param {Values} values - substitutions to make, either as a generic list (for numbered keys), or as a map-style object to replace named keys or deep (dot-notation) paths.
     * @return {string}
     */
    compile(template, values) {
        return Templette.compile(template, values);
    }
    /**
     * Templette's main compile method, powered by JavaScript's powerful builtin RegExp engine.
     *
     * @example Templette.compile ('Hello {{name}}!', { name: 'Nick' })
     * // Hello Nick!
     * @param {string} template - the raw template string we want to compile
     * @param {Values} values - substitutions to make, either as a generic list (for numbered keys), or as a map-style object to replace named keys or deep (dot-notation) paths.
     * @return {string}
     */
    static compile(template, values) {
        return template.replace(/[{]{1,3}\s*(.*?)\s*[}]{1,3}/g, (x, key, y) => {
            (x = 0), (y = values);
            key = key.trim().split('.');
            while (y && x < key.length) {
                y = y[key[x++]];
            }
            return y != null ? y : '';
        });
    }
    /**
     * Cleanup a template string and remove some inconsistencies.
     * @param {string} template raw unformatted template string
     * @param {Record<string, unknown>} [substitutions] optional map of substitutions to make: each property name is the search pattern or string, and its value is the replacement string or function.
     * @returns {string} formatted and normalized template string
     */
    static cleanup(template, substitutions) {
        substitutions = substitutions || [[/[{]{1}[\s ]?([\S]+)[\s ]?[}]{1}/g, (_m0, m1) => `{{${m1}}}`]];
        return substitutions.reduce((t, [s, r]) => `${t}`.replace(s, r), String.prototype.toString.call(template));
    }
    /**
     * Getter method for `.template` on instances of `Templette` that were constructed
     * using the `new Templette()` constructor method.
     * @example const t = new Templette();
     * console.log(t.template);
     * // null
     */
    get template() {
        return this.#template ?? null;
    }
    /**
     * Instance-level setter method for the `new Templette().template` property.
     * @param {string} str the template value to set
     */
    set template(str) {
        if (str)
            this.#template = Templette.cleanup(str);
    }
}
