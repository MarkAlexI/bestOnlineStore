const addLinks = (res, page, perPage, total, url) => {
  const lastPage = Math.ceil(total/perPage);
  const nextPage = Math.min(page + 1, lastPage);

  const links = {};

  if (nextPage < lastPage) {
    links.next = `${url}${nextPage}`;
  }

  if (page < lastPage) {
    links.last = `${url}${lastPage}`;
  }

  if (Object.keys(links).length > 0) {
    res.links(links);
  }

  return;
};

export default addLinks;
