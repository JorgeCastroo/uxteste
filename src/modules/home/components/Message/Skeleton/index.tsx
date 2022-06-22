import React from 'react'
import SkeletonPlaceholder from "react-native-skeleton-placeholder"

const SkeletonHomeMessage: React.FC = () => {

    return(

        <SkeletonPlaceholder speed = {800}>
            <SkeletonPlaceholder.Item width = {'100%'} height = {84} borderRadius = {10} />
        </SkeletonPlaceholder>

    )

}

export default SkeletonHomeMessage