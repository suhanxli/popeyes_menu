if (!localStorage.getItem('userId')) {
  localStorage.setItem('userId', String(Math.random()));
}

async function handleClick(event) {
  console.log(event);
  const pageX = Math.round(event.pageX);
  const pageY = Math.round(event.pageY);
  const path1stDataItem = event.path.find((item) => ("trackingid" in item.dataset));
  const textClicked = event.target.innerText;
  const timeOnPage = Math.round(event.timeStamp);
  const userId = localStorage.getItem('userId');

  const body = {pageX, pageY, path1stDataItem, textClicked, timeOnPage, userId};
  const url  = '/clicks';
  
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({body}),
  });
}

window.addEventListener('click', handleClick);