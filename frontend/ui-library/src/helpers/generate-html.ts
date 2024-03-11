export const generateHTML = (value: string): string =>
    value
        .replace(
            /(\b(https?|):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi,
            '<a target="_blank" rel="noopener noreferrer" href="$1">$1</a>',
        )
        .replace(/(^|[^/])(www\.[\S]+(\b|$))/gim, '$1<a target="_blank" rel="noopener noreferrer" href="http://$2">$2</a>')
        .replace(/\n/gi, '<p></p>');
