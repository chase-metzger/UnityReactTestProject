import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.unityContent = new UnityContent("Build/WebGL.json", "Build/UnityLoader.js");
  }

  render() {
    return (
      <>
        <p>Hello world</p>
        <Unity unityContent={this.unityContent} />
        <p>Bye world</p>
      </>
    );
  }
}

export default App;
