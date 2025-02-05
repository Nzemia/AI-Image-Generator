import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
    AntDesign,
    Entypo,
    Ionicons
} from "@expo/vector-icons"
// import {
//     BannerAd,
//     BannerAdSize,
//     TestIds
// } from "react-native-google-mobile-ads"

import HomeScreen from "./screens/HomeScreen"
import DiscoverScreen from "./screens/DiscoverScreen"
import LikeScreen from "./screens/LikeScreen"
import { useTheme } from "@/constants/ThemeContext"
import { LikeImageProvider } from "@/context/LikeImageContext"

const Tab = createBottomTabNavigator()

{
    /**google ads. if you want to, you can implement the full screen 
     * screen ad, it is easy check readme for documentation
     *
     * . remember to modify the app.json and add the app id. also below */
}
// const adUnitId = __DEV__
//     ? TestIds.ADAPTIVE_BANNER
//     : "ca-app-pub-yyyyyyyyyyyy/xxxxxxxxxxxx"

export default function App() {
    const { theme } = useTheme()
    return (
        <>
            <LikeImageProvider>
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: {
                            backgroundColor:
                                theme.background
                        },
                        tabBarInactiveTintColor:
                            theme.inactiveTabColor,
                        tabBarActiveTintColor:
                            theme.activeTabColor,
                        tabBarShowLabel: false
                    }}
                >
                    <Tab.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            tabBarIcon: ({ ...rest }) => (
                                <Entypo
                                    name={"home"}
                                    {...rest}
                                />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Discover"
                        component={DiscoverScreen}
                        options={{
                            tabBarIcon: ({ ...rest }) => (
                                <Ionicons
                                    name={"globe-sharp"}
                                    {...rest}
                                />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Like"
                        component={LikeScreen}
                        options={{
                            tabBarIcon: ({
                                focused,
                                color,
                                size
                            }) => (
                                <AntDesign
                                    name={
                                        focused
                                            ? "heart"
                                            : "hearto"
                                    }
                                    color={color}
                                    size={size}
                                />
                            )
                        }}
                    />
                </Tab.Navigator>
            </LikeImageProvider>
            {/* <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            /> */}
        </>
    )
}
