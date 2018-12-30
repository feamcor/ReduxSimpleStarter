import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import VideoSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyBOTcUJNiP7B6MuAszHnaQkJyggD2bsts0';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('rust-lang');
    }

    videoSearch(searchTerm) {
        VideoSearch({key: API_KEY, term: searchTerm}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce(searchTerm => {this.videoSearch(searchTerm)}, 500);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                           videos={this.state.videos}/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('.container'));
