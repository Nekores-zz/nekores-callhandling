//
// Copyright (c) 2020 Call-Handling Services [https://www.callhandling.co.uk/]
// Author: 4ητonio Prατєs [antonioprates@gmail.com], jan-2020
//

export const getMockLoadable = (futureContent, setState) => {
  const _loadable = {
    mockPrivate: {
      futureContent,
      setState
    },
    content: undefined,
    isLoading: false
  };

  const loadCallback = myLoadable => () => {
    myLoadable.content = myLoadable.mockPrivate.futureContent;
    myLoadable.isLoading = false;
    myLoadable.mockPrivate.setState();
  };

  // mocks a load time of 1 second
  _loadable.load = () => {
    _loadable.isLoading = true;
    _loadable.mockPrivate.setState();
    setTimeout(loadCallback(_loadable), 1000);
  };

  return _loadable;
};
