import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "./screens/HomeScreen"
import DiscoverScreen from "./screens/DiscoverScreen"
import LikeScreen from "./screens/LikeScreen"
import {
    AntDesign,
    Entypo,
    Ionicons
} from "@expo/vector-icons"
import { useTheme } from "@/constants/ThemeContext"
import { LikeImageProvider } from "@/context/LikeImageContext"

const Tab = createBottomTabNavigator()

export default function App() {
    const { theme } = useTheme()
    return (
        <LikeImageProvider>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: theme.background
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
    )
}
