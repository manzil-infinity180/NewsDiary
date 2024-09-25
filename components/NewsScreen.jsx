import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
const dropdownData = [
  { label: "Bussiness", value: "business" },
  { label: "Technology", value: "technology" },
  { label: "Entertainment", value: "entertainment" },
  { label: "General", value: "general" },
  { label: "Health", value: "health" },
  { label: "Science", value: "science" },
  { label: "Sports", value: "sports" },
];
function NewsScreen() {
  const navigation = useNavigation();
  const [newsData, onNewsData] = useState("");
  const [value, setValue] = useState("technology");
  const [isFocus, setIsFocus] = useState(false);
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };
  async function fetchData() {
    try {
      // const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=the-times-of-india&apiKey=${process.env.EXPO_PUBLIC_NEWSAPI}`);
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?category=${value}&pageSize=15&apiKey=${process.env.EXPO_PUBLIC_NEWSAPI}`
      );
      const data = await res.json();
      // console.log(data);
      // onNewsData(data.articles);
      const data1 = data.articles?.filter((d) => d.urlToImage !== null);

      onNewsData(data1 || []);
      // console.log(DummyData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [value]);

  /*
    "articles": [
        {
            "source": {
                "id": "the-times-of-india",
                "name": "The Times of India"
            },
            "author": "Rajat Pandit",
            "title": "Army explores procurement of 350 light tanks for mountainous terrain after border standoff with China",
            "description": "India News:  The Army is now exploring the possibility of procuring 350 light tanks, which can also be transported by air, to augment its firepower in high-altitu",
            "url": "http://timesofindia.indiatimes.com/india/army-explores-procurement-of-350-light-tanks-for-mountainous-terrain-after-border-standoff-with-china/articleshow/82217825.cms",
            "urlToImage": "https://static.toiimg.com/thumb/msid-82217908,width-1070,height-580,imgsize-264639,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
            "publishedAt": "2021-04-23T08:29:00Z",
            "content": "Army explores procurement of 350 light tanks for mountainous terrain after border standoff with China\r\n<ul><li>News</li>\r\n<li>India News</li>\r\n<li>Army explores procurement of 350 light tanks for mou… [+58 chars]"
        },
    */
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dropdownData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            console.log(item);

            setValue(item.value);
            console.log(value);
            setIsFocus(false);
            // fetchData(item.value);
            // console.log(item.data);
          }}
          renderLeftIcon={() => (
            <MaterialCommunityIcons
              name="form-dropdown"
              size={16}
              color="black"
              style={{ margin: "0 6px" }}
            />
          )}
        />
        <View style={styles.container}>
          {newsData &&
            newsData.map((data) => (
              <View
                style={styles.card}
                key={data.source.id}
                onPress={() => console.log(data.sourceName.title)}
              >
                <Image
                  source={{ uri: data.urlToImage }}
                  style={styles.image}
                  resizeMode="cover" // Better for images
                />
                <View style={styles.textContainer}>
                  <Text style={styles.sourceName}>{data.title}</Text>
                  <Text style={styles.authorName}>{data.description}</Text>
                  <Text style={styles.authorName}>~ {data.source.name}</Text>
                  <Text
                    style={styles.readMore}
                    onPress={() => {
                      // Opens the article in the default browser or WebView
                      Linking.openURL(data.url); // Use Linking for opening URLs
                    }}
                  >
                    Read More
                  </Text>
                </View>

                {/* <TouchableOpacity>
                  <Text
                    className="text-red-500 my-2 text-lg text-center"
                    onPress={() => navigation.navigate("NewsContent",{
                      news_content: data.content
                    })}
                  >
                    Read More
                  </Text>
                </TouchableOpacity> */}
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f4f4", // Light background
  },
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 6,
    overflow: "hidden",
    shadowColor: "#000", // For shadow on iOS
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // For shadow on Android
  },
  image: {
    width: "100%",
    height: 180,
  },
  textContainer: {
    padding: 10,
    alignItems: "center",
  },
  sourceName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 4,
  },
  authorName: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 4,
    color: "#333",
  },
  description: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 4,
    color: "#333",
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    paddingHorizontal: 5,
  },
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    margin: 16,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default NewsScreen;
