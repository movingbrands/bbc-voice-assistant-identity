export const empty = elem => {
  while (elem.lastChild) elem.removeChild(elem.lastChild);
};

export const isValidElement = (elem, type) =>
  !!elem && elem.tagName && elem.tagName === type;
