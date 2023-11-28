const addLinks = (res, page, perPage, total) => {
  const lastPage = Math.ceil(total/perPage);
  const nextPage = Math.min(page + 1, lastPage);

  res.links({
    next: `${nextPage}`,
    last: `${lastPage}`
  });

  return;
};

export default addLinks;
