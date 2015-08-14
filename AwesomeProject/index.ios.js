/**
* Sample React Native App
* https://github.com/facebook/react-native
*/
'use strict';
var React = require('react-native');
var {
    ScrollView,
    TouchableHighlight,
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
} = React;

var REQUEST_URL = 'http://192.168.1.102:8888/test.json';

var AwesomeProject = React.createClass({
    getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),
    loaded: false,
  };
},

componentDidMount: function() {
    this.fetchData();
},

fetchData: function() {
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
        this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        loaded: true,
        });
    })
    .done();
},

render: function() {
    if (!this.state.loaded) {
        return this.renderLoadingView();
    }

    return (
        <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
        />
    );
},

renderLoadingView: function() {
    return (
        <View style={styles.container}>
            <Text>
                Loading movies...
            </Text>
        </View>
    );
},

renderMovie: function(movie) {
    return (
        <TouchableHighlight onPress={() => console.log('pressed')}>
            <View style={styles.container}>
                <Image
                    source={{uri: movie.posters.thumbnail}}
                    style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.year}>{movie.year}</Text>
                </View>
            </View>
        </TouchableHighlight>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingBottom: 10
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    },
    thumbnail: {
        width: 53,
        height: 81,
    },
    listView: {
        backgroundColor: '#F5FCFF'
    }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);