import React, { useState } from "react";
import { Image } from "react-native";
import FastImage from 'react-native-fast-image';

const getUriImage = (uri) => {
    return uri !== null &&
    uri !== undefined &&
    uri.includes('/') &&
    uri.includes('.')
    ? uri
    : '';
    };
    
export default ProgressiveImage = (props) => {
    const {source} = props;
    
    const [hasError, setHasError] = useState(false);
    
    return source?.uri ? (
    <FastImage
    {...props}
    fallback={hasError}
    onError={() => setHasError(true)}
    source={{
    uri: getUriImage(source?.uri),
    cache: FastImage.cacheControl.immutable,
    }}
    
    />
    ) : (
    <Image {...props} />
    );
    };