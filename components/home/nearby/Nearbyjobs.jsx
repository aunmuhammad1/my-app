import React from "react";
import { 
  View, 
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { useRouter } from "expo-router";
import { SIZES, COLORS } from "../../../constants";
import styles from "./nearbyjobs.style";
import Nearbyjobscard from '../../common/cards/nearby/NearbyJobCard';
import { isLoaded } from "expo-font";
import { keyboardProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import  useFetch  from "../../../hook/useFetch";

const Nearbyjobs = () => {
  const router = useRouter();
  const {data, isLoading, error} = useFetch(
    'search', {
      query: 'React developer',
      num_pages: 1,
    }
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Neaby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>View All</Text>
        </TouchableOpacity>
      </View>
  
      <ScrollView>
        <View style={styles.cardsContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : (
            data.map((item) => (
              <Nearbyjobscard
                job={item}
                key={`nearby-job-${item?.job_id}`}
                handleNavigate={() => router.push(`/job-details/${item?.job_id}`) }
              
              />
            ))
          )}      
        </View>
      </ScrollView>
    </View>
  );
};

export default Nearbyjobs;

