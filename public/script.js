if (!localStorage.getItem('userId')) {
  localStorage.setItem('userId', String(Math.random()));
}
let temp;
async function handleClick(event) {
  const pageX = Math.round(event.pageX);
  const pageY = Math.round(event.pageY);
  const path1stDataItem = event.path.find((item) => ("trackingid" in item.dataset));
  const trackingId = path1stDataItem.dataset.trackingid;
  const textClicked = event.target.innerText;
  const timeOnPage = Math.round(event.timeStamp);
  const userId = localStorage.getItem('userId');

  const body = {pageX, pageY, trackingId, textClicked, timeOnPage, userId};
  const url  = '/clicks';
 
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({body
      // pageX: body.pageX,
      // pageY: body.pageY,
      // trackingId: body.trackingId,
      // textClicked: body.textClicked,
      // timeOnPage: body.timeOnPage,
      // userId: body.userId,
    }),
  });
}

window.addEventListener('click', handleClick);