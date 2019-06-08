import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import Meme from './components/Meme';

const objectToQueryParams = obj => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`)
  return '?' + params.join('&');
};

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      templates: [],
      meme: null,
      currentTemplate: null,
      topText: '',
      bottomText: ''
    };

    this.unityContent = new UnityContent("Build/WebGL.json", "Build/UnityLoader.js")
  }

  componentDidMount() {
    fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(memesResponse => this.setState({ templates: memesResponse.data.memes }));
  }

  handleTemplateSelect = (template) => {
    this.setState({ currentTemplate: template });
  }

  renderContent = (currentTemplate) => {
    const { topText, bottomText } = this.state;

    if (currentTemplate) {
      return (
        <>
          <form
            onSubmit={async event => {
              event.preventDefault();

              const params = {
                template_id: currentTemplate.id,
                text0: topText,
                text1: bottomText,
                username: process.env.REACT_APP_IMGFLIP_USERNAME,
                password: process.env.REACT_APP_IMGFLIP_PASSWORD
              };
              const response = await fetch(`https://api.imgflip.com/caption_image${objectToQueryParams(params)}`)
              const jsonResponse = await response.json();
              this.unityContent.send('MemeImageUpdater', 'SetMemeImage', jsonResponse.data.url);
              this.setState({ meme: jsonResponse.data.url });
            }}
          >
            <Meme template={currentTemplate} onClick={null} />
            <input placeholder="Top text" value={topText} onChange={event => this.setState({ topText: event.target.value })} />
            <input placeholder="Bottom text" value={bottomText} onChange={event => this.setState({ bottomText: event.target.value })} />
            <button type="submit">Create meme</button>
          </form>
          <Unity unityContent={this.unityContent} />
        </>
      );
    } else {
      return (
        <div style={{ textAlign: "center" }}>
          <h1>Pick a template</h1>
          {
            this.state.templates.map(template => {
              return <Meme
                key={template.id}
                template={template}
                onClick={() => this.handleTemplateSelect(template)}
              />
            })
          }
        </div>
      )
    }
  }


  render() {
    return (
      <>
        {
          this.renderContent(this.state.currentTemplate)
        }
      </>
    );
  }
}

export default App;
