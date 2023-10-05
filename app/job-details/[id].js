import { 
    React,
    useState,
    useCallback,
} from "react";
import { 
    View, 
    Text, 
    ScrollView, 
    SafeAreaView,
    ActivityIndicator,
    RefreshControl, 
} from "react-native";
import { 
    Stack, 
    useRouter, 
    useSearchParams 
} from "expo-router";
import {
    Company,
    JobAbout,
    JobFooter,
    JobTabs,
    Specifics,
    ScreenHeaderBtn,
} from '../../components/index'
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from '../../hook/useFetch';
const tabs = ['About', 'Qualifications', 'Responsibilities'];

const JobDetails = () => {
    const params = useSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {};

    const displayTabContent = () => {
        switch (activeTab) {
            case 'About':
                return <JobAbout info={data[0].job_description ?? ['No data provided']} />;
            case 'Qualifications':
                return <Specifics 
                    title='Qualifications'
                    points={data[0].job_highlights?.Qualifications ?? ['N/A']} />;
            case 'Responsibilities':
                return <Specifics 
                    title='Responsibilities'
                    points={data[0].job_highlights?.Responsibilities ?? ['N/A']} />;
            default:
               break;
        }
    };

    const { data, isLoading, error, refetch } = useFetch('job-details', {
        job_id: params.id
    })
    return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
            options={{
                headerStyle: {
                    backgroundColor: COLORS.lightWhite,
                },
                headerShadowVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn
                        iconUrl={icons.left}
                        dimension='60%'
                        handlePress={() => {
                            router.back()
                        }}
                    />
                ),
                headerRight: () => (
                    <ScreenHeaderBtn
                        iconUrl={icons.share}
                        dimension='60%'
                    />
                ),
                headerTitle: ''
            }}
        />
        <>
           <ScrollView 
                showsVerticalScrollIndicator={false} 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {
                    isLoading ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : error ? (
                        <Text>Somethng went wrong</Text>
                    ) : data.length === 0 ? (
                        <Text>No data found</Text>
                    ) : (
                        <View
                            style={{ flex: 1, padding: SIZES.medium, paddingBottom:100 }}
                        >
                            <Company
                                companyLogo={data[0].employer_logo}
                                jobTitle={data[0].job_title}
                                companyName={data[0].employer_name}
                                location={data[0].job_country}
                                state={data[0].job_state}
                                city={data[0].job_city}
                            />
                            <JobTabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                            {displayTabContent()}
                            <JobFooter
                                url={data[0]?.job_google_link ?? 'https://www.google.com/jobs/results'}
                            />
                        </View>
                    )

                }
            </ScrollView> 
        </>
    </SafeAreaView>
)};

export default JobDetails;