import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "./screens/HomeScreen"
import DiscoverScreen from "./screens/DiscoverScreen"
import LikeScreen from "./screens/LikeScreen"
import {
    AntDesign,
    Entypo,
    Ionicons
} from "@expo/vector-icons"
import { colors } from "../constants/theme"

const Tab = createBottomTabNavigator()

export default function App() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.primary
                },
                tabBarInactiveTintColor:
                    colors.inactiveTabColor,
                tabBarActiveTintColor:
                    colors.activeTabColor,
                tabBarShowLabel: false
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ ...rest }) => (
                        <Entypo name={"home"} {...rest} />
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
                                focused ? "heart" : "hearto"
                            }
                            color={color}
                            size={size}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}
