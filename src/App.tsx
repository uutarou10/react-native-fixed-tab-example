import React from 'react';
import {SafeAreaView, Text, View, FlatList, Animated} from 'react-native';

const Header = () => {
  return (
    <View
      style={{
        height: 100,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eb4034',
      }}>
      <Text>This is header</Text>
    </View>
  );
};

const FixedTab = () => {
  return (
    <View
      style={{
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a62d24',
      }}>
      <Text>Tabだよ</Text>
    </View>
  );
};

const App = () => {
  const [listData] = React.useState(() =>
    [...Array(500)].map((_, index) => String(index)),
  );

  const [tabHeight, setTabHeight] = React.useState(0);
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const animatedRef = React.useRef(new Animated.Value(0));

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList
          data={listData}
          ListHeaderComponent={() => (
            <View>
              <View
                onLayout={e => {
                  setHeaderHeight(e.nativeEvent.layout.height);
                  Animated.timing(animatedRef.current, {
                    toValue: headerHeight,
                    duration: 0,
                  }).start();
                }}
                style={{width: '100%', marginBottom: tabHeight}}>
                <Header />
              </View>
              <Animated.View
                style={{
                  position: 'absolute',
                  width: '100%',
                  top: animatedRef.current,
                  zIndex: 999
                }}
                onLayout={e => setTabHeight(e.nativeEvent.layout.height)}>
                <FixedTab />
              </Animated.View>
            </View>
          )}
          renderItem={({item}) => (
            <View
              style={{
                height: 50,
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingHorizontal: 10,
              }}>
              <Text>{item}</Text>
            </View>
          )}
          keyExtractor={(_, index) => String(index)}
          onScroll={e =>
            Animated.timing(animatedRef.current, {
              toValue:
                e.nativeEvent.contentOffset.y <= headerHeight
                  ? headerHeight
                  : e.nativeEvent.contentOffset.y,
              duration: 0,
            }).start()
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
