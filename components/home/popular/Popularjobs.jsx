import {React, useState} from "react";
import { 
  View, 
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";
import { useRouter } from "expo-router";
import { SIZES, COLORS } from "../../../constants";
import styles from "./popularjobs.style";
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import { isLoaded } from "expo-font";
import { keyboardProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import  useFetch  from "../../../hook/useFetch";

const Popularjobs = () => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState();
  const handleCardpress = (item) => {
    setSelectedJob(item);
    router.push(`/job-details/${item.job_id}`);
  };

  const {data, isLoading, error} = useFetch('web%20devloper');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>View All</Text>
        </TouchableOpacity>
      </View>
  

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({item}) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardpress} 
              />
            )}
            keyExtractor={item => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}      
      </View>
    </View>
  );
};

export default Popularjobs;
