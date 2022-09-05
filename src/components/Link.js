import React from "react";

const Link = ( {className, href, children }) => {
  const onClick = (event) => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }

    event.preventDefault(); //prevents the refresh of the entire page each time something is changed
    window.history.pushState({}, '', href); //*Change URL without a full refresh of the page

    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent); //this comunicates over those route components that the URL just changed
  }
  return <a onClick={onClick} className={className} href={href}>{children}</a>;
}

export default Link;