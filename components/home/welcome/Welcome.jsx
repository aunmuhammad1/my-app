import { useState } from "react";
import styles from "./welcome.style";
import React from "react";
import {
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  TextInput,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { icons, images, SIZES, COLORS, FONT } from "../../../constants";

const jobTypes = ["Full Time", "Part Time", "Internship", "Contractor", "Freelancer"];

const Welcome = () => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState(jobTypes[0]);

  return(
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello, Aun</Text>
        <Text style={styles.welcomeMessage}>Find a perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onChange={() => {}}
            placeholder="What are you looking for?"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={()=>{}}>
          <Image 
            source={icons.search}
            resizeMode="contain" 
            style={styles.searchBtnImage} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({item}) => (
            <TouchableOpacity 
              style={styles.tab(activeJobType, item)} 
              onPress={()=>{
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
              >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  )
}

export default Welcome;
