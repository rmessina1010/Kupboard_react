class validator {
    constructor(fields) {
        this.errors = {};
        this.fields = fields;
    }

    isInvalid(state) {
        let isInvalid = [];
        for (let field in this.fields) {
            if (state && this.errors[field] === undefined) {
                this.validate(state, { [field]: this.fields[field] });
            }
            if (this.errors[field] || this.errors[field] === undefined) {
                isInvalid.push(field);
            }
        }
        return isInvalid.length > 0 ? isInvalid : false;
    }

    isValidEmail = email => { return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email); }

    isValidAddress = str => { return /^#?[\d-]+\s[\w\d\s-_#\.]+$/.test(str); }

    isValidZip = str => { return /^\d{5}(?:-\d{4})?$/.test(str); }

    isValidName = str => { return /[A-Za-z]{1,}(?:\s[A-Za-z]{1,})*/.test(str); }

    match = (str1, str2) => { return (str1 === str2) ? true : false; }

    required = str => { console.log(str); return this.minLen(str); }

    requiredTrue = el => { return el ? true : false; }

    minLen = (str, min = 1) => { return (str + '').trim().length >= min ? true : false; }

    maxLen = (str, max = 1) => { return (str + '').trim().length <= max ? true : false; }



    validate(data = {}, fields = null) {
        if (!fields) { fields = this.fields; }
        let field;
        for (field in fields) {
            let value = data[field];
            let tests = fields[field];

            let error = '';
            tests.forEach(test => {
                console.log(data)
                if (this[test.test]) {
                    let arg = test.test === 'match' ? data[test.arg] : test.arg
                    if (!this[test.test].call(this, value, arg)) { error += test.err + ' '; }
                }
            });
            this.errors[field] = error ? error : null;
        }
        return this.errors;
    }
}

export default validator;