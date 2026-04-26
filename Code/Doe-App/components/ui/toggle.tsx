import { Switch } from "react-native";
import { useTheme } from "@/constants/theme-provider";

type ToggleProps = {
  value: boolean;
  onValueChange: (v: boolean) => void;
  disabled?: boolean;
};

export function Toggle({ value, onValueChange, disabled = false }: ToggleProps) {
  const { colors } = useTheme();
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{ false: colors.toggle.off, true: colors.toggle.on }}
      thumbColor={value ? colors.toggle.onThumb : colors.toggle.offThumb}
      ios_backgroundColor={colors.toggle.off}
    />
  );
}
