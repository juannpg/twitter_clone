import React from "react"
import ContentLoader from "react-content-loader"

export const TweetFeedSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width="95%"
    height="100%"
    viewBox="0 0 680 460"
    backgroundColor="#d8d0d0"
    foregroundColor="#616161"
    {...props}
  >
    <rect x="7%" y="19" rx="3" ry="3" width="13%" height="6" /> 
    <rect x="0" y="56" rx="3" ry="3" width="98%" height="6" /> 
    <rect x="0" y="72" rx="3" ry="3" width="80%" height="6" /> 
    <rect x="0" y="88" rx="3" ry="3" width="37%" height="6" /> 
    <circle cx="3%" cy="20" r="20" /> 
    <rect x="7%" y="137" rx="3" ry="3" width="13%" height="6" /> 
    <rect x="0" y="174" rx="3" ry="3" width="98%" height="6" /> 
    <rect x="0" y="190" rx="3" ry="3" width="80%" height="6" /> 
    <rect x="0" y="206" rx="3" ry="3" width="37%" height="6" /> 
    <circle cx="3%" cy="138" r="20" /> 
    <rect x="7%" y="257" rx="3" ry="3" width="13%" height="6" /> 
    <circle cx="3%" cy="258" r="20" /> 
    <rect x="7%" y="375" rx="3" ry="3" width="13%" height="6" /> 
    <rect x="0" y="412" rx="3" ry="3" width="98%" height="6" /> 
    <rect x="0" y="428" rx="3" ry="3" width="80%" height="6" /> 
    <rect x="0" y="444" rx="3" ry="3" width="37%" height="6" /> 
    <circle cx="3%" cy="376" r="20" /> 
    <rect x="0" y="296" rx="3" ry="3" width="98%" height="6" /> 
    <rect x="0" y="312" rx="3" ry="3" width="80%" height="6" /> 
    <rect x="0" y="328" rx="3" ry="3" width="37%" height="6" />
  </ContentLoader>
)

export const RepliesSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width="100%"
    height="100%"
    viewBox="0 0 680 230"
    backgroundColor="#d8d0d0"
    foregroundColor="#616161"
    className="mt-6"
    {...props}
  >
    <rect x="44%" y="11" rx="3" ry="3" width="13%" height="6" /> 
    <rect x="7%" y="45" rx="3" ry="3" width="13%" height="6" /> 
    <rect x="0" y="75" rx="3" ry="3" width="98%" height="6" /> 
    <rect x="0" y="91" rx="3" ry="3" width="80%" height="6" /> 
    <rect x="0" y="107" rx="3" ry="3" width="37%" height="6" /> 
    <circle cx="5%" cy="46" r="20" /> 
    <rect x="18%" y="170" rx="3" ry="3" width="13%" height="6" /> 
    <rect x="11%" y="198" rx="3" ry="3" width="74%" height="6" /> 
    <rect x="11%" y="213" rx="3" ry="3" width="37%" height="6" /> 
    <circle cx="13.5%" cy="171" r="20" /> 
    <rect x="6%" y="127" rx="3" ry="3" width="70%" height="5" />
  </ContentLoader>
)