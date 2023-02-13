import { loadPyodide } from 'pyodide';
import { json } from '@sveltejs/kit';

const pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.22.1/full/' });
await pyodide.loadPackage('sympy');

export const POST = (async ({ request }) => {
	const { code, type } = await request.json();
	let result;
	switch (type) {
		case 'nullstellen':
			result = await pyodide.runPythonAsync(`from sympy.abc import x, y; from sympy import solve; solve(${code})`);
			break;
		case 'extrema':
			result = await pyodide.runPythonAsync(`
from sympy.abc import x, y
from sympy import diff, solve

expr=${code}
fd=diff(expr,x)
fdd=diff(fd,x)

extrema=solve(fd,x)

def fn(extrema):
    if fdd.subs(x,extrema)<0:
        return "Hochpunkt"
    if fdd.subs(x,extrema)>0:
        return "Tiefpunkt"
    else:
        return "Sattelpunkt"

wert=[expr.subs(x,_) for _ in extrema]

namen=[fn(_) for _ in extrema]
namen,extrema, wert`)
			break;
		default:
			return json({ error: 'Invalid type' });
	}

	console.log(result.toString());
	return json(result.toString());
});