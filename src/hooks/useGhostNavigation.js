import useGhostSettings from './useGhostSettings';

export const useGhostNavigation = () => {
  const {
    navigation: primary,
    secondary_navigation: secondary,
  } = useGhostSettings();

  return { primary, secondary };
};

export default useGhostNavigation;
