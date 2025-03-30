const past_courses = ['CS115', 'CS135', 'CS284'];
const desired_courses = ['CS347', 'CS334', 'CS101'];

function isTerm(maybe) {
    return typeof maybe === 'string';
}

/*
    Input: "AND(CS385, OR(CS182, CS115))"
    Output: {op: "and", a: "CS385", b: {op: "or", a: "CS182", b: "CS115"}}
*/

export function parseExpr(expr) {
    expr = expr.trim();

    if (expr == 'NULL') return null;
    if (!expr.includes('(')) return expr;

    const match = expr.match(/^([A-Z]+)\((.*)\)$/);

    const op = match[1].toLowerCase();
    const argsStr = match[2];

    let depth = 0;
    let args = [];
    let current = '';
    for (let char of argsStr) {
        if (char === ',' && depth === 0) {
            args.push(current.trim());
            current = '';
        } else {
            if (char === '(') depth++;
            if (char === ')') depth--;
            current += char;
        }
    }
    if (current) args.push(current.trim());

    if (args.length !== 2)
        throw new Error('Expected binary operation with two arguments');

    return {
        op,
        a: parseExpr(args[0]),
        b: parseExpr(args[1]),
    };
}

export function eligible(f, p) {
    let e_a, e_b;
    if (isTerm(f.a) && isTerm(f.b)) {
        e_a = p.includes(f.a);
        e_b = p.includes(f.b);
    } else if (isTerm(f.a) && !isTerm(f.b)) {
        e_a = p.includes(f.a);
        e_b = eligible(f.b, p);
    } else if (!isTerm(f.a) && isTerm(f.b)) {
        e_a = eligible(f.a, p);
        e_b = p.includes(f.a);
    } else {
        e_a = eligible(f.a, p);
        e_b = eligible(f.b, p);
    }
    if (f.op == 'and') {
        return e_a && e_b;
    } else if (f.op == 'or') {
        return e_a || e_b;
    }
}
