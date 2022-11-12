# :rocket: General notes, dependencies, workarounds

needs to create metro.config.js at root. Expo docs explain why [here](https://docs.expo.dev/guides/using-firebase/#step-3-configure-metro)

```JavaScript
const { getDefaultConfig } = require("@expo/metro-config");
const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push("cjs");
module.exports = config;
```

---

## AsyncStorage core is deprecated, React Native recomends:

[AsyncStorage -> follow link to docs](https://react-native-async-storage.github.io/async-storage/docs/install)

### installing and importing

`
npm install @react-native-async-storage/async-storage
`

`
import AsyncStorage from '@react-native-async-storage/async-storage';
`

### storing data

setItem() is used both to add new data item (when no data for given key exists), and to modify existing item (when previous data for given key exists).

#### Storing string value

```JavaScript
const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value)
  } catch (e) {
    // saving error
  }
}
```

#### storing object value

```JavaScript
const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@storage_Key', jsonValue)
  } catch (e) {
    // saving error
  }
}
```
### reading data

getItem returns a promise that either resolves to stored value when data is found for given key, or returns null otherwise.

#### Reading string value

```JavaScript

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      // value previously stored
    }
  } catch(e) {
    // error reading value
  }
}
```

#### Reading object value

```JavaScript
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}
```

