import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image 
} from "react-native";

import styles from "./popularjobcard.style";
const PopularJobCard = ({item, selectedJob, handleCardPress}) => {
  if(item.location == null){
    item.location = "Remote";
  }
  if(item.employer_logo == null){
    item.employer_logo = "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg";
  }
  return (
    <TouchableOpacity 
      style={styles.container(selectedJob, item)}
      // onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity
        style={styles.logoContainer(selectedJob, item)} 
      >
        <Image
            source={{uri: item.employer_logo}}
            resizeMode="contain"
            style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>{item.companyName}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>{item.jobtitle}</Text>
        <Text style={styles.location} numberOfLines={1}>{`${item.location}`}</Text>
      </View>
    </TouchableOpacity>
  )
};

export default PopularJobCard;
