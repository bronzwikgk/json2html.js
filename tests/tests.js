const vm = require('vm');
const fs = require('fs');
const originalFoo = fs.readFileSync('./src/json2html.js', 'utf8');
const script = new vm.Script(originalFoo);
script.runInThisContext();

QUnit.test('Test empty build', function( assert ) {
  assert.equal( JSON2HTML.build(), '');
});

QUnit.test('Test build with no tag name', function( assert ) {
  assert.equal( JSON2HTML.build({}), '');
});

QUnit.test('Test self closing tag', function( assert ) {
  assert.equal( JSON2HTML.build({tag: 'hr'}), '<hr />');
});

QUnit.test('Test self closing tag with attribute', function( assert ) {
  // eslint-disable-next-line max-len
  assert.equal( JSON2HTML.build({tag: 'hr', attributes: {id: 'not-big-deal'}}), '<hr  id="not-big-deal"/>');
});

QUnit.test('Test self closing tag with children', function( assert ) {
  assert.equal( JSON2HTML.build({tag: 'hr', children: [
    {tag: 'p'},
  ]}), '<hr />');
});

QUnit.test('Test complex html', function( assert ) {
  const json = {
    'tag': 'div',
    'attributes': {
      'class': 'container-lg py-6 p-responsive text-center',
    },
    'children': [{
      'tag': 'img',
      'attributes': {
        'src': 'https://avatars3.githubusercontent.com/u/30579757?v=4',
        'class': 'circle mb-3',
        'style': 'max-width: 150px; margin: auto; display: block;',
      },
    }, {
      'tag': 'h1',
      'attributes': {
        'class': ' mb-2 lh-condensed',
      },
      'children': ['Guilherme Fabrin Franco'],
    }, {
      'tag': 'p',
      'attributes': {
        'class': 'mb-3 f4 text-gray',
      },

    }, {
      'tag': 'div',
      'attributes': {
        'class': 'f4 mb-6',
      },
      'children': [{
        'tag': 'div',
        'attributes': {
          'class': 'd-md-inline-block mx-3 mb-1 mb-md-0',
        },
        'children': [{
          'tag': 'svg',
          'attributes': {
            'height': '20',
            'class': 'octicon octicon-mark-github mr-2 v-align-middle',
            'fill': '#24292e',
            'aria-label': 'GitHub',
            'viewBox': '0 0 16 16',
            'version': '1.1',
            'width': '20',
            'role': 'img',
          },
          'children': [{
            'tag': 'path',
            'attributes': {
              'fill-rule': 'evenodd',
              // eslint-disable-next-line max-len
              'd': 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z',
            },
          }],
        }, {
          'tag': 'a',
          'attributes': {
            'href': 'https://github.com/guifabrin',
          },
          'children': ['@guifabrin'],
        }],
      }, {
        'tag': 'div',
        'attributes': {
          'class': 'd-md-inline-block mx-3 mb-1 mb-md-0',
        },
        'children': [{
          'tag': 'svg',
          'attributes': {
            'height': '20',
            'class': 'octicon octicon-mail mr-2 v-align-middle',
            'fill': '#24292e',
            'aria-label': 'email',
            'viewBox': '0 0 14 16',
            'version': '1.1',
            'width': '17',
            'role': 'img',
          },
          'children': [{
            'tag': 'path',
            'attributes': {
              'fill-rule': 'evenodd',
              // eslint-disable-next-line max-len
              'd': 'M0 4v8c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H1c-.55 0-1 .45-1 1zm13 0L7 9 1 4h12zM1 5.5l4 3-4 3v-6zM2 12l3.5-3L7 10.5 8.5 9l3.5 3H2zm11-.5l-4-3 4-3v6z',
            },

          }],
        }, {
          'tag': 'a',
          'attributes': {
            'href': 'mailto:guilherme.fabrin@gmail.com',
          },
          'children': ['guilherme.fabrin@gmail.com'],
        }],
      }, {
        'tag': 'div',
        'attributes': {
          'class': 'd-md-inline-block mx-3 mb-1 mb-md-0 ',
        },
        'children': [{
          'tag': 'svg',
          'attributes': {
            'height': '20',
            'class': 'octicon octicon-location mr-2 v-align-middle',
            'fill': '#24292e',
            'aria-label': 'Location',
            'viewBox': '0 0 12 16',
            'version': '1.1',
            'width': '15',
            'role': 'img',
          },
          'children': [{
            'tag': 'path',
            'attributes': {
              'fill-rule': 'evenodd',
              // eslint-disable-next-line max-len
              'd': 'M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z',
            },

          }],
        }, 'Ijuí  '],
      }, {
        'tag': 'div',
        'attributes': {
          // eslint-disable-next-line max-len
          'class': 'd-flex flex-wrap flex-items-start flex-justify-center mt-1 mt-md-3',
        },
        'children': [{
          'tag': 'div',
          'attributes': {
            'class': 'mr-3 mb-3',
          },
          'children': [{
            'tag': 'a',
            'attributes': {
              'href': 'https://www.facebook.com/guifabrin',
              'class': 'tooltipped tooltipped-se',
              'aria-label': 'Facebook: guifabrin',
            },
            'children': [{
              'tag': 'svg',
              'attributes': {
                'height': '20',
                'xmlns': 'http://www.w3.org/2000/svg',
                'viewBox': '0 0 15.3 15.4',
              },
              'children': [{
                'tag': 'path',
                'attributes': {
                  // eslint-disable-next-line max-len
                  'd': 'M14.5 0H.8a.88.88 0 0 0-.8.9v13.6a.88.88 0 0 0 .8.9h7.3v-6h-2V7.1h2V5.4a2.87 2.87 0 0 1 2.5-3.1h.5a10.87 10.87 0 0 1 1.8.1v2.1h-1.3c-1 0-1.1.5-1.1 1.1v1.5h2.3l-.3 2.3h-2v5.9h3.9a.88.88 0 0 0 .9-.8V.8a.86.86 0 0 0-.8-.8z',
                  'fill': '#959da5',
                },

              }],
            }, {
              'tag': 'span',
              'attributes': {
                'class': 'd-none',
              },
              'children': ['Facebook'],
            }],
          }],
        }, {
          'tag': 'div',
          'attributes': {
            'class': 'mr-3 mb-3',
          },
          'children': [{
            'tag': 'a',
            'attributes': {
              'href': 'https://www.instagram.com/guifabrin',
              'class': 'tooltipped tooltipped-se',
              'aria-label': 'Instagram: guifabrin',
            },
            'children': [{
              'tag': 'svg',
              'attributes': {
                'viewBox': '0 0 512 512',
                'xmlns': 'http://www.w3.org/2000/svg',
                'width': '20',
                'height': '20',
                'fill': '#959da5',
              },
              'children': [{
                'tag': 'path',
                'attributes': {
                  // eslint-disable-next-line max-len
                  'd': 'M256,49.471c67.266,0,75.233.257,101.8,1.469,24.562,1.121,37.9,5.224,46.778,8.674a78.052,78.052,0,0,1,28.966,18.845,78.052,78.052,0,0,1,18.845,28.966c3.45,8.877,7.554,22.216,8.674,46.778,1.212,26.565,1.469,34.532,1.469,101.8s-0.257,75.233-1.469,101.8c-1.121,24.562-5.225,37.9-8.674,46.778a83.427,83.427,0,0,1-47.811,47.811c-8.877,3.45-22.216,7.554-46.778,8.674-26.56,1.212-34.527,1.469-101.8,1.469s-75.237-.257-101.8-1.469c-24.562-1.121-37.9-5.225-46.778-8.674a78.051,78.051,0,0,1-28.966-18.845,78.053,78.053,0,0,1-18.845-28.966c-3.45-8.877-7.554-22.216-8.674-46.778-1.212-26.564-1.469-34.532-1.469-101.8s0.257-75.233,1.469-101.8c1.121-24.562,5.224-37.9,8.674-46.778A78.052,78.052,0,0,1,78.458,78.458a78.053,78.053,0,0,1,28.966-18.845c8.877-3.45,22.216-7.554,46.778-8.674,26.565-1.212,34.532-1.469,101.8-1.469m0-45.391c-68.418,0-77,.29-103.866,1.516-26.815,1.224-45.127,5.482-61.151,11.71a123.488,123.488,0,0,0-44.62,29.057A123.488,123.488,0,0,0,17.3,90.982C11.077,107.007,6.819,125.319,5.6,152.134,4.369,179,4.079,187.582,4.079,256S4.369,333,5.6,359.866c1.224,26.815,5.482,45.127,11.71,61.151a123.489,123.489,0,0,0,29.057,44.62,123.486,123.486,0,0,0,44.62,29.057c16.025,6.228,34.337,10.486,61.151,11.71,26.87,1.226,35.449,1.516,103.866,1.516s77-.29,103.866-1.516c26.815-1.224,45.127-5.482,61.151-11.71a128.817,128.817,0,0,0,73.677-73.677c6.228-16.025,10.486-34.337,11.71-61.151,1.226-26.87,1.516-35.449,1.516-103.866s-0.29-77-1.516-103.866c-1.224-26.815-5.482-45.127-11.71-61.151a123.486,123.486,0,0,0-29.057-44.62A123.487,123.487,0,0,0,421.018,17.3C404.993,11.077,386.681,6.819,359.866,5.6,333,4.369,324.418,4.079,256,4.079h0Z',
                },

              }, {
                'tag': 'path',
                'attributes': {
                  // eslint-disable-next-line max-len
                  'd': 'M256,126.635A129.365,129.365,0,1,0,385.365,256,129.365,129.365,0,0,0,256,126.635Zm0,213.338A83.973,83.973,0,1,1,339.974,256,83.974,83.974,0,0,1,256,339.973Z',
                },

              }, {
                'tag': 'circle',
                'attributes': {
                  'cx': '390.48',
                  'cy': '121.52',
                  'r': '30.23',
                },

              }],
            }, {
              'tag': 'span',
              'attributes': {
                'class': 'd-none',
              },
              'children': ['Instagram'],
            }],
          }],
        }, {
          'tag': 'div',
          'attributes': {
            'class': ' mb-3',
          },
          'children': [{
            'tag': 'a',
            'attributes': {
              'href': 'https://www.linkedin.com/in/guifabrin',
              'class': 'tooltipped tooltipped-se',
              'aria-label': 'LinkedIn: guifabrin',
            },
            'children': [{
              'tag': 'svg',
              'attributes': {
                'height': '20',
                'xmlns': 'http://www.w3.org/2000/svg',
                'viewBox': '0 0 19 18',
              },
              'children': [{
                'tag': 'path',
                'attributes': {
                  // eslint-disable-next-line max-len
                  'd': 'M3.94 2A2 2 0 1 1 2 0a2 2 0 0 1 1.94 2zM4 5.48H0V18h4zm6.32 0H6.34V18h3.94v-6.57c0-3.66 4.77-4 4.77 0V18H19v-7.93c0-6.17-7.06-5.94-8.72-2.91z',
                  'fill': '#959da5',
                },

              }],
            }, {
              'tag': 'span',
              'attributes': {
                'class': 'd-none',
              },
              'children': ['LinkedIn'],
            }],
          }],
        }],
      }, {
        'tag': 'span',
        'attributes': {
          'title': 'Hire me',
          'class': 'd-inline-block f5 rounded-2 text-white bg-green py-1 px-2',
        },
        'children': ['Available for hire'],
      }],
    }, {
      'tag': 'div',


    }, {
      'tag': 'p',

      'children': ['I swear I\'m going to develop this portfolio someday.'],
    }, {
      'tag': 'form',
      'attributes': {
        'action': 'https://formspree.io/guilherme.fabrin@gmail.com',
        'method': 'POST',
      },
      'children': [{
        'tag': 'div',
        'attributes': {
          'class': 'form-group',
        },
        'children': ['  ', {
          'tag': 'label',

          'children': ['Name: '],
        }, {
          'tag': 'input',
          'attributes': {
            'class': 'form-control',
            'type': 'text',
            'name': 'name',
          },

        }],
      }, {
        'tag': 'div',
        'attributes': {
          'class': 'form-group',
        },
        'children': ['  ', {
          'tag': 'label',

          'children': ['E-mail: '],
        }, {
          'tag': 'input',
          'attributes': {
            'class': 'form-control',
            'type': 'email',
            'name': '_replyto',
          },

        }],
      }, {
        'tag': 'div',
        'attributes': {
          'class': 'form-group',
        },
        'children': ['  ', {
          'tag': 'label',

          'children': ['Message: '],
        }, {
          'tag': 'textarea',
          'attributes': {
            'class': 'form-control',
            'name': 'message',
          },

        }],
      }, {
        'tag': 'input',
        'attributes': {
          'class': 'btn btn-default',
          'type': 'submit',
          'value': 'Send',
        },

      }],
    }],
  };
  const html = `<div  class="container-lg py-6 p-responsive text-center"><img  src="https://avatars3.githubusercontent.com/u/30579757?v=4" class="circle mb-3" style="max-width: 150px; margin: auto; display: block;"/><h1  class=" mb-2 lh-condensed">Guilherme Fabrin Franco</h1><p  class="mb-3 f4 text-gray"></p><div  class="f4 mb-6"><div  class="d-md-inline-block mx-3 mb-1 mb-md-0"><svg  height="20" class="octicon octicon-mark-github mr-2 v-align-middle" fill="#24292e" aria-label="GitHub" viewBox="0 0 16 16" version="1.1" width="20" role="img"><path  fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg><a  href="https://github.com/guifabrin">@guifabrin</a></div><div  class="d-md-inline-block mx-3 mb-1 mb-md-0"><svg  height="20" class="octicon octicon-mail mr-2 v-align-middle" fill="#24292e" aria-label="email" viewBox="0 0 14 16" version="1.1" width="17" role="img"><path  fill-rule="evenodd" d="M0 4v8c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H1c-.55 0-1 .45-1 1zm13 0L7 9 1 4h12zM1 5.5l4 3-4 3v-6zM2 12l3.5-3L7 10.5 8.5 9l3.5 3H2zm11-.5l-4-3 4-3v6z"></path></svg><a  href="mailto:guilherme.fabrin@gmail.com">guilherme.fabrin@gmail.com</a></div><div  class="d-md-inline-block mx-3 mb-1 mb-md-0 "><svg  height="20" class="octicon octicon-location mr-2 v-align-middle" fill="#24292e" aria-label="Location" viewBox="0 0 12 16" version="1.1" width="15" role="img"><path  fill-rule="evenodd" d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg>Ijuí  </div><div  class="d-flex flex-wrap flex-items-start flex-justify-center mt-1 mt-md-3"><div  class="mr-3 mb-3"><a  href="https://www.facebook.com/guifabrin" class="tooltipped tooltipped-se" aria-label="Facebook: guifabrin"><svg  height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.3 15.4"><path  d="M14.5 0H.8a.88.88 0 0 0-.8.9v13.6a.88.88 0 0 0 .8.9h7.3v-6h-2V7.1h2V5.4a2.87 2.87 0 0 1 2.5-3.1h.5a10.87 10.87 0 0 1 1.8.1v2.1h-1.3c-1 0-1.1.5-1.1 1.1v1.5h2.3l-.3 2.3h-2v5.9h3.9a.88.88 0 0 0 .9-.8V.8a.86.86 0 0 0-.8-.8z" fill="#959da5"></path></svg><span  class="d-none">Facebook</span></a></div><div  class="mr-3 mb-3"><a  href="https://www.instagram.com/guifabrin" class="tooltipped tooltipped-se" aria-label="Instagram: guifabrin"><svg  viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#959da5"><path  d="M256,49.471c67.266,0,75.233.257,101.8,1.469,24.562,1.121,37.9,5.224,46.778,8.674a78.052,78.052,0,0,1,28.966,18.845,78.052,78.052,0,0,1,18.845,28.966c3.45,8.877,7.554,22.216,8.674,46.778,1.212,26.565,1.469,34.532,1.469,101.8s-0.257,75.233-1.469,101.8c-1.121,24.562-5.225,37.9-8.674,46.778a83.427,83.427,0,0,1-47.811,47.811c-8.877,3.45-22.216,7.554-46.778,8.674-26.56,1.212-34.527,1.469-101.8,1.469s-75.237-.257-101.8-1.469c-24.562-1.121-37.9-5.225-46.778-8.674a78.051,78.051,0,0,1-28.966-18.845,78.053,78.053,0,0,1-18.845-28.966c-3.45-8.877-7.554-22.216-8.674-46.778-1.212-26.564-1.469-34.532-1.469-101.8s0.257-75.233,1.469-101.8c1.121-24.562,5.224-37.9,8.674-46.778A78.052,78.052,0,0,1,78.458,78.458a78.053,78.053,0,0,1,28.966-18.845c8.877-3.45,22.216-7.554,46.778-8.674,26.565-1.212,34.532-1.469,101.8-1.469m0-45.391c-68.418,0-77,.29-103.866,1.516-26.815,1.224-45.127,5.482-61.151,11.71a123.488,123.488,0,0,0-44.62,29.057A123.488,123.488,0,0,0,17.3,90.982C11.077,107.007,6.819,125.319,5.6,152.134,4.369,179,4.079,187.582,4.079,256S4.369,333,5.6,359.866c1.224,26.815,5.482,45.127,11.71,61.151a123.489,123.489,0,0,0,29.057,44.62,123.486,123.486,0,0,0,44.62,29.057c16.025,6.228,34.337,10.486,61.151,11.71,26.87,1.226,35.449,1.516,103.866,1.516s77-.29,103.866-1.516c26.815-1.224,45.127-5.482,61.151-11.71a128.817,128.817,0,0,0,73.677-73.677c6.228-16.025,10.486-34.337,11.71-61.151,1.226-26.87,1.516-35.449,1.516-103.866s-0.29-77-1.516-103.866c-1.224-26.815-5.482-45.127-11.71-61.151a123.486,123.486,0,0,0-29.057-44.62A123.487,123.487,0,0,0,421.018,17.3C404.993,11.077,386.681,6.819,359.866,5.6,333,4.369,324.418,4.079,256,4.079h0Z"></path><path  d="M256,126.635A129.365,129.365,0,1,0,385.365,256,129.365,129.365,0,0,0,256,126.635Zm0,213.338A83.973,83.973,0,1,1,339.974,256,83.974,83.974,0,0,1,256,339.973Z"></path><circle  cx="390.48" cy="121.52" r="30.23"></circle></svg><span  class="d-none">Instagram</span></a></div><div  class=" mb-3"><a  href="https://www.linkedin.com/in/guifabrin" class="tooltipped tooltipped-se" aria-label="LinkedIn: guifabrin"><svg  height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18"><path  d="M3.94 2A2 2 0 1 1 2 0a2 2 0 0 1 1.94 2zM4 5.48H0V18h4zm6.32 0H6.34V18h3.94v-6.57c0-3.66 4.77-4 4.77 0V18H19v-7.93c0-6.17-7.06-5.94-8.72-2.91z" fill="#959da5"></path></svg><span  class="d-none">LinkedIn</span></a></div></div><span  title="Hire me" class="d-inline-block f5 rounded-2 text-white bg-green py-1 px-2">Available for hire</span></div><div ></div><p >I swear I'm going to develop this portfolio someday.</p><form  action="https://formspree.io/guilherme.fabrin@gmail.com" method="POST"><div  class="form-group">  <label >Name: </label><input  class="form-control" type="text" name="name"/></div><div  class="form-group">  <label >E-mail: </label><input  class="form-control" type="email" name="_replyto"/></div><div  class="form-group">  <label >Message: </label><textarea  class="form-control" name="message"></textarea></div><input  class="btn btn-default" type="submit" value="Send"/></form></div>`;
  assert.equal( JSON2HTML.build(json), html);
});
