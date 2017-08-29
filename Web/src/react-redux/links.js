// Universal place for links, in case they need to change ...
export const links = {
    notFound: '404-page-not-found',
    home: '/',
};

export const activeClass = (link, activeRoute) => {
    if (activeRoute === link || activeRoute === `/${link}`) {
        return ' active';
    }
    return '';
};
