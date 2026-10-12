import { Link } from 'expo-router';
import Head from 'expo-router/head';
import { StyleSheet, View } from 'react-native';

import { Body, CONTAINER, Logo, Title } from '@/components/ui';
import { useTheme } from '@/theme';

/**
 * Served as 404.html by GitHub Pages (the export script copies it), so it
 * needs a real title and a way back, unlike the router's default page.
 */
export default function NotFoundScreen() {
  const t = useTheme();
  return (
    <View style={[styles.page, { backgroundColor: t.bg }]}>
      <Head>
        <title>Page not found · Shoal</title>
      </Head>
      <Logo size={56} />
      <Title style={{ textAlign: 'center' }}>Page not found</Title>
      <Body style={{ textAlign: 'center' }}>There is nothing at this address.</Body>
      <Link href="/" style={[styles.link, { color: t.primary }]}>
        Back to the home page
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    ...CONTAINER,
    flex: 1,
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 48,
  },
  link: {
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
