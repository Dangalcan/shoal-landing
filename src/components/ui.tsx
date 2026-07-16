import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PropsWithChildren } from 'react';
import {
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { useTheme } from '@/theme';

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

export const MONO = Platform.select({ ios: 'Menlo', default: 'monospace' });

/* ---------- Text ---------- */

export function Title({ children, style }: PropsWithChildren<{ style?: TextStyle }>) {
  const t = useTheme();
  return <Text style={[styles.title, { color: t.ink }, style]}>{children}</Text>;
}

export function Subtitle({ children, style }: PropsWithChildren<{ style?: TextStyle }>) {
  const t = useTheme();
  return <Text style={[styles.subtitle, { color: t.ink2 }, style]}>{children}</Text>;
}

export function Body({ children, style }: PropsWithChildren<{ style?: TextStyle }>) {
  const t = useTheme();
  return <Text style={[styles.body, { color: t.ink3 }, style]}>{children}</Text>;
}

/* ---------- Layout ---------- */

export function Section({
  tag,
  heading,
  children,
  style,
}: PropsWithChildren<{ tag?: string; heading: string; style?: ViewStyle }>) {
  const t = useTheme();
  return (
    <View style={[styles.section, style]}>
      {tag ? (
        <View style={[styles.tag, { backgroundColor: t.primarySoft }]}>
          <Text style={[styles.tagText, { color: t.primary }]}>{tag}</Text>
        </View>
      ) : null}
      <Text style={[styles.heading, { color: t.ink }]}>{heading}</Text>
      {children}
    </View>
  );
}

export function Card({ children, style }: PropsWithChildren<{ style?: ViewStyle }>) {
  const t = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border }, style]}>
      {children}
    </View>
  );
}

/* ---------- Pieces ---------- */

export function IconBadge({
  icon,
  color,
  background,
  size = 40,
}: {
  icon: IconName;
  color: string;
  background: string;
  size?: number;
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 4,
        backgroundColor: background,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <MaterialCommunityIcons name={icon} size={size * 0.55} color={color} />
    </View>
  );
}

export function Bullet({ children }: PropsWithChildren) {
  const t = useTheme();
  return (
    <View style={styles.bullet}>
      <MaterialCommunityIcons name="check-circle-outline" size={16} color={t.success} />
      <Text style={[styles.bulletText, { color: t.ink2 }]}>{children}</Text>
    </View>
  );
}

export function Chip({ label, icon }: { label: string; icon?: IconName }) {
  const t = useTheme();
  return (
    <View style={[styles.chip, { borderColor: t.border, backgroundColor: t.card }]}>
      {icon ? <MaterialCommunityIcons name={icon} size={14} color={t.ink3} /> : null}
      <Text style={{ color: t.ink2, fontSize: 13, fontWeight: '500' }}>{label}</Text>
    </View>
  );
}

export function Button({
  label,
  icon,
  onPress,
  url,
  variant = 'primary',
  style,
}: {
  label: string;
  icon?: IconName;
  onPress?: () => void;
  /** When set, the button opens this URL (works on web and native). */
  url?: string;
  variant?: 'primary' | 'ghost';
  style?: ViewStyle;
}) {
  const t = useTheme();
  const solid = variant === 'primary';
  const bg = solid ? (t.dark ? '#f1f5f9' : '#0f172a') : 'transparent';
  const fg = solid ? (t.dark ? '#0f172a' : '#ffffff') : t.ink;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={url ? () => Linking.openURL(url) : onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: bg, borderColor: solid ? bg : t.border, opacity: pressed ? 0.8 : 1 },
        style,
      ]}>
      {icon ? <MaterialCommunityIcons name={icon} size={17} color={fg} /> : null}
      <Text style={{ color: fg, fontWeight: '600', fontSize: 15 }}>{label}</Text>
    </Pressable>
  );
}

export function PriceTag({ price }: { price: number }) {
  const t = useTheme();
  const free = price === 0;
  return (
    <View
      style={[
        styles.priceTag,
        free
          ? { backgroundColor: t.successSoft }
          : { backgroundColor: t.dark ? '#f1f5f9' : '#0f172a' },
      ]}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '700',
          color: free ? (t.dark ? t.success : '#166534') : t.dark ? '#0f172a' : '#ffffff',
        }}>
        {free ? 'Free' : `$${price}`}
      </Text>
    </View>
  );
}

export function CodeBlock({ lines }: { lines: { text: string; color?: string }[] }) {
  return (
    <View style={styles.code}>
      {lines.map((l, i) => (
        <Text
          key={i}
          style={{
            fontFamily: MONO,
            fontSize: 12.5,
            lineHeight: 21,
            color: l.color ?? '#cbd5e1',
          }}>
          {l.text || ' '}
        </Text>
      ))}
    </View>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 40,
    gap: 10,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  heading: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 18,
    gap: 8,
  },
  bullet: {
    flexDirection: 'row',
    gap: 9,
    alignItems: 'flex-start',
  },
  bulletText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 44,
  },
  priceTag: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  code: {
    backgroundColor: '#0b1220',
    borderColor: '#1e293b',
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
  },
});
