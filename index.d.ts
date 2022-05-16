declare type Template<T extends string = string> = T;
declare type Values<
	K extends string | number = string,
	V = string | ((...args: string[]) => string)
> = {
    [P in K]: V;
} | [K, V][] | V[];

declare class Templette {
    #private;
    /**
     * Construct a new Templette instance from a template string.
     *
     * @param {Template} template - the raw template string we render with
     */
    constructor(template: Template);
    /**
     * Render the template with provided values.
     *
     * @param {Values} values
     * @returns {string}
     */
    render(values: Values): string;
    /**
     * Templette's main compile method, powered by JavaScript's powerful builtin RegExp engine.
     *
     * @example Templette.compile ('Hello {{name}}!', { name: 'Nick' })
     * // Hello Nick!
     * @param {Template} template - the raw template string we want to compile
     * @param {Values} values - substitutions to make, either as a generic list (for numbered keys), or as a map-style object to replace named keys or deep (dot-notation) paths.
     * @return {string}
     */
    compile(template: Template, values: Values): string;
    /**
     * Templette's main compile method, powered by JavaScript's powerful builtin RegExp engine.
     *
     * @example Templette.compile ('Hello {{name}}!', { name: 'Nick' })
     * // Hello Nick!
     * @param {string} template - the raw template string we want to compile
     * @param {Values} values - substitutions to make, either as a generic list (for numbered keys), or as a map-style object to replace named keys or deep (dot-notation) paths.
     * @return {string}
     */
    static compile(template: string, values: Values): string;
    /**
     * Cleanup a template string and remove some inconsistencies.
     * @param {string} template raw unformatted template string
     * @param {Record<string, unknown>} [substitutions] optional map of substitutions to make: each property name is the search pattern or string, and its value is the replacement string or function.
     * @returns {string} formatted and normalized template string
     */
    static cleanup(template: string, substitutions?: [string | RegExp, any][]): string;
    /**
     * Getter method for `.template` on instances of `Templette` that were constructed
     * using the `new Templette()` constructor method.
     * @example const t = new Templette();
     * console.log(t.template);
     * // null
     */
    get template(): string;
    /**
     * Instance-level setter method for the `new Templette().template` property.
     * @param {string} str the template value to set
     */
    set template(str: string);
}

export { Template, Values, Templette as default };

declare module '@brlt/tpl' {
	const Templette: Templette;
	export default Templette;
	export = Templette;
}

declare module '*.cjs' {
	var Templette: Templette;
	export = Templette;
}

declare module '*.mjs' {
	const Templette: Templette;
	export default Templette;
}
