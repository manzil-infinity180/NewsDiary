import { Text, View } from "react-native";
import { useRoute } from '@react-navigation/native';

function NewsContent() {
    /* 2. Get the param */
    const  route = useRoute();
   
    const { news_content } = route.params;
    console.log({news_content});
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>{news_content}</Text>
      </View>
    );
  }

  export default NewsContent;