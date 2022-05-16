const test = require('tape');
const templette = require('../dist/index.cjs')
const { compile, cleanup } = templette;

test('exports', t => {
	t.is(typeof compile, 'function', '~> a function');
	t.end();
});

test('basic :: object', t => {
	let x = 'Hello, {{name}}!';
	let y = { name: 'world' };
	t.is(compile(x, y), 'Hello, world!');
	t.same(x, 'Hello, {{name}}!', '~> input string intact');
	t.same(y, { name: 'world' }, '~> input object intact');
	t.end();
});

test('basic :: array', t => {
	let x = 'Hello, {{0}}!';
	let y = ['world'];
	t.is(compile(x, y), 'Hello, world!');
	t.same(x, 'Hello, {{0}}!', '~> input string intact');
	t.same(y, ['world'], '~> input array intact');
	t.end();
});

test('repeats', t => {
	t.is(compile('{{0}}{{0}}{{0}}', ['🎉']), '🎉🎉🎉');
	t.is(compile('{{x}}{{x}}{{x}}', { x: 'hi~' }), 'hi~hi~hi~');
	t.end();
});

test('invalid key ~> empty string', t => {
	let obj = { a:1, b:2 };
	t.is(compile('{{a}}{{d}}{{b}}', obj), '12');
	t.is(compile('{{d}}', obj), '');
	let arr = [1, 2];
	t.is(compile('{{0}}{{9}}{{1}}', arr), '12');
	t.is(compile('{{9}}', arr), '');
	t.end();
});

test('null keys', t => {
	let obj = { a:null, b:undefined };
	t.is(compile('{{a}}~{{b}}', obj), '~');
	let arr = [ null, , undefined ];
	t.is(compile('{{0}}~{{1}}~{{2}}', arr), '~~');
	t.end();
});

test('nested keys', t => {
	let obj = {
		name: 'John',
		foo: {
			bar: {
				baz: 'Smith'
			}
		}
	};
	let arr = ['John', [[['Smith']]]];
	t.is(compile('{{name}} {{foo.bar.baz}}', obj), 'John Smith');
	t.is(compile('{{0}} {{1.0.0}}', arr), 'John Smith');
	t.end();
});

test('nested keys (invalid)', t => {
	let obj = { foo:123 };
	t.is(compile('{{foo.bar}}', obj), '');
	t.is(compile('{{foo.bar.baz}}', obj), '');
	let arr = [123];
	t.is(compile('{{0.1}}', arr), '');
	t.is(compile('{{0.1.2}}', arr), '');
	t.end();
});

test('trim keys (whitespace)', t => {
	let obj = { foo:123, bar:{ baz:456 } };
	t.is(compile('{{ foo }}', obj), '123');
	t.is(compile('{{ bar.baz }}', obj), '456');
	let arr = [123, [456]];
	t.is(compile('{{ 0 }}', arr), '123');
	t.is(compile('{{ 1.0 }}', arr), '456');
	t.end();
});

test('multiline string', t => {
	let obj = { foo:123, bar:456 };
	t.is(compile('\nApples: {{foo}}\n\nOranges: {{bar}}', obj), '\nApples: 123\n\nOranges: 456');
	t.is(compile(`
		Apples: {{foo}}
		Oranges: {{bar}}
	`, obj), '\n\t\tApples: 123\n\t\tOranges: 456\n\t');
	t.end();
});

test('mixed datatype', t => {
	let arr = [4, 5, 6];
	arr.foo = 'hello';
	arr.bar = 'world';
	t.is(compile('{{foo}}, {{bar}}! {{0}}{{1}}{{2}}', arr), 'hello, world! 456');
	t.end();
});

test('allows "0" value', t => {
	t.is(compile('{{0}} & {{1}}', [0, -1]), '0 & -1');
	t.end();
});

test('currying', t => {
	let x = compile.bind(null, 'Hello, {{name}}');
	let arr = ['Jack', 'Jill', 'John'].map(name => x({ name }));
	t.same(arr, ['Hello, Jack', 'Hello, Jill', 'Hello, John']);
	t.end();
});
