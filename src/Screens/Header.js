import React from 'react'
import { View, Text, TouchableOpacity, TouchableOpacityBase } from 'react-native'
import tailwind from 'tailwind-rn'
import { Foundation, Ionicons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native'

const Header = ({ title, callEnabled }) => {

    const navigation = useNavigation()

    return (
        <View style={tailwind("p-2 flex-row items-center justify-between ")}>
            <View style={tailwind("flex flex-row items-center")}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={tailwind("p-2")} >
                    <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
                </TouchableOpacity>
                <Text style={tailwind("text-2xl font-bold pl-2")}>{title}</Text>
            </View>
            { callEnabled && (
                <TouchableOpacity style={tailwind("rounded-full mr-4 p-3 bg-red-200")}>
                    <Foundation style={tailwind("")} name='telephone' size={20} color="red" />
                </TouchableOpacity>
            ) }
        </View>
    )
}

export default Header
