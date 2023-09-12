import { EventsAPI } from './eventsAPI';
import { paginationMarkap } from './pagination';
import { qwerty } from '../images/sprite.svg';

const gallery = document.querySelector('.js-events-gallery');
const paginationList = document.querySelector('.pagination');

export async function displayGallery(options) {
  const res = await EventsAPI.getEvents(options);
  const pageNumber = res.page.number + 1;
  const totalPages = res.page.totalPages;

  if (res.page.totalElements) {
    gallery.innerHTML = galleryMarkup(res._embedded.events);
    paginationList.innerHTML = paginationMarkap(totalPages, pageNumber);
  } else gallery.innerHTML = galleryMarkupZeroReq();
}

function galleryMarkup(arr = []) {
  return arr.reduce((acc, event) => {
    const {
      name,
      id,
      images,
      dates: {
        start: { localDate },
      },
      _embedded: { venues },
    } = event;
    const {
      address: { line1: address },
      city: { name: cityName },
      name: nameOfPlace,
    } = venues[0];
    const eventImg =
      images.find(elem => {
        if (300 <= elem.height && elem.height <= 450 && elem.ratio === '16_9') {
          return elem;
        }
      }) || images[0];
     return (acc += `<li class="gallery__item">
         <div class="gallery__div" data-id="${id}">
            <a class="gallery__link animation js-gallery-card" data-id="${id}" href="">
                <img class="gallery__img" src="${eventImg.url}" width="267px" height="337px" alt="thing">
                <div class="gallery__pinkBorder"></div>
                <div class="event-info" data-id="${id}">
                    <h3 class="event-heading">
                        <svg class="event-icon" width="7" height="10">
                            <use href="${qwerty}#Map"></use>
                        </svg>
                        ${name}
                    </h3>
                    <p class="event-data">${localDate}</p>
                    <p class="event-place" data-id="${id}">
                        <svg class="Map__icon" width="7" height="10">
                            <use href="${qwerty}#Map"></use>
                        </svg>
                        ${nameOfPlace || cityName || address || 'No info about place'}
                    </p>
                </div>
            </a>
        </div></li>`);
  }, '');
}

function galleryMarkupZeroReq() {
  return `<div class="zero-matches">
        <img class="zero-matches__img" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZGVmcz4KICA8Y2xpcFBhdGggaWQ9ImEiPgogICA8cGF0aCBkPSJtMTYyIDEzOS4yMWg0Mjh2NDczLjU4aC00Mjh6Ii8+CiAgPC9jbGlwUGF0aD4KIDwvZGVmcz4KIDxnIGNsaXAtcGF0aD0idXJsKCNhKSI+CiAgPHBhdGggZD0ibTM4My42NSAyNDguNzNjLTczLjgxMi0yNC44ODctMTM1LjAyLTY0Ljc0Mi0xNzUtMTA5LjUyLTEyOC40IDM5Mi42MSA1My40MjYgNDcwLjAzIDUzLjQyNiA0NzAuMDNzMTg2Ljg0IDYzIDMyNy4xOC0zNDEuNjdjLTU4LjkzOCAxMS40MS0xMzEuNzkgNi4wNTA4LTIwNS42LTE4Ljg0NHptLTExMC41OSA3NC44ODNjMTkuMjAzIDYuNDcyNyAzMS4xMDIgMjYuNDQ1IDMyLjc5NyA1MC42NDggMCAwLTE4LjM5NS0yNi0zOC43ODUtMzIuODc1LTIwLjM5MS02Ljg3NS01MC43NzcgMi42NzE5LTUwLjc3NyAyLjY3MTkgMTYuMDA0LTE4LjIzOCAzNy41NjYtMjYuOTI2IDU2Ljc2Ni0yMC40NDV6bTM2Ljg3NSAxNDMuNzFjLTQ4LjA1NS0xNi4yMDctMTE1Ljg5LTQuODM1OS0xMTUuODktNC44MzU5IDMzLjIzLTI5LjY5NSA4MS4wMi00MS4xODQgMTI2LjI3LTI1LjkzIDQ1LjI0NiAxNS4yNjIgNzYuMzA5IDUzLjM0OCA4NC43NzcgOTcuMDk4IDAuMDAzOTA3IDAuMDA3ODEyLTQ3LjA5NC01MC4xMjUtOTUuMTQ4LTY2LjMzMnptMTEwLjM4LTc0LjI1NGMtMjAuMzk4LTYuODc1LTUwLjc3NyAyLjY3MTktNTAuNzc3IDIuNjcxOSAxNi4wMDQtMTguMjM4IDM3LjU3LTI2LjkyMiA1Ni43Ny0yMC40NDUgMTkuMjAzIDYuNDcyNyAzMS4xMDIgMjYuNDQ1IDMyLjc4OSA1MC42NDggMC4wMDc4MTIgMC0xOC4zODMtMjYtMzguNzgxLTMyLjg3NXoiIGZpbGw9IiNkYzU1YzUiLz4KIDwvZz4KPC9zdmc+Cg==" alt="Drama Theatre Of Ancient Greece Comedy Mask - Theatre Masks">
            <p class="zero-matches__text">Sorry. We couldn't find any matches</p>
    </div>`;
}
