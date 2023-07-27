export function formatCommaNumber(num: any) {
  if (!num) return 0;
  const p = num.toString().split('.');
  p[0] = p[0]
    .split('')
    .reverse()
    .reduce(function (acc: any, num: any, i: any) {
      return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
    }, '');
  return p[1] ? p.join('.') : p[0];
}

export const getFullUrl = (url: string) => {
  if (url.startsWith('http')) {
    return url;
  }
  if (!url.startsWith('/')) {
    url = '/' + url;
  }
  return `${process.env.NEXT_PUBLIC_API_URL}` + url;
};

export const removeEmptyKey = (data: any) => {
  for (const propName in data) {
    if (data[propName] === null || data[propName] === undefined || data[propName] === '') {
      delete data[propName];
    }
  }
  return data;
};

export const filterOption = (input: string, option: any) => {
  return (option?.textFilter ?? '').toLowerCase().includes(input.toLowerCase());
};
