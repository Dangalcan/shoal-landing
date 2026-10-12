import Head from 'expo-router/head';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Body,
  Bullet,
  Button,
  Card,
  CodeBlock,
  CONTAINER,
  MONO,
  Section,
  Subtitle,
  Title,
} from '@/components/ui';
import { CONFIG, docsUrl, ghUrl } from '@/config';
import { useTheme } from '@/theme';

const KEY = '#5eead4';
const STR = '#fcd34d';
const COMMENT = '#64748b';

const MANIFEST = [
  { text: '// plugin.json', color: COMMENT },
  { text: '{' },
  { text: '  "id": "my-first-plugin",', color: KEY },
  { text: '  "name": "My First Plugin",', color: KEY },
  { text: '  "version": "1.0.0",', color: KEY },
  { text: '  "description": "Shows quick stats for the active cluster",', color: KEY },
  { text: '  "author": "You",', color: KEY },
  { text: '  "main": "index.js",', color: KEY },
  { text: '  "renderer": "renderer.js",', color: KEY },
  { text: '  "permissions": ["kubernetes", "ui", "storage"],', color: STR },
  { text: '  "license": { "type": "free", "spdx": "MIT" }', color: STR },
  { text: '}' },
];

const PERMISSIONS = [
  { name: 'kubernetes', text: 'cluster reads and writes through kubectl, Helm and manifests' },
  { name: 'ui', text: 'notifications, modals and external links' },
  { name: 'storage', text: 'data the plugin keeps between runs' },
];

export default function DevelopersScreen() {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ backgroundColor: t.bg }}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 48 }}>
      <Head>
        <title>Plugin developers · Shoal</title>
        <link rel="canonical" href={`${CONFIG.siteUrl}developers`} />
        <meta property="og:url" content={`${CONFIG.siteUrl}developers`} />
      </Head>

      <View style={styles.head}>
        <Title style={{ fontSize: 28, lineHeight: 34 }}>For plugin developers</Title>
        <Subtitle>
          Extend Shoal with your own pages, dashboard widgets and resource actions. A plugin is a
          small JavaScript bundle with a manifest, and the two bundled examples are a good place to
          start.
        </Subtitle>
      </View>

      <Section tag="How it works" heading="A Node module plus a sandboxed UI.">
        <Body>
          The Node side talks to your clusters through a permission-gated context. The UI side runs
          in a sandboxed frame and only reaches what the manifest declares.
        </Body>
        <View style={{ gap: 10, marginTop: 4 }}>
          <Bullet>Register pages, dashboard widgets, sidebar entries, modals and resource actions</Bullet>
          <Bullet>Declare settings in the manifest and Shoal draws the settings form for you</Bullet>
          <Bullet>Store data per plugin and show notifications in the app</Bullet>
          <Bullet>Installed plugins run their Node code in a separate process</Bullet>
        </View>
        <CodeBlock lines={MANIFEST} />
      </Section>

      <Section tag="Permissions" heading="Three capabilities, all opt-in.">
        <Body>
          Plugins only reach what the manifest declares. The manifest also accepts filesystem,
          network and notifications, which are reserved for 1.0 and grant nothing yet.
        </Body>
        <View style={styles.perms}>
          {PERMISSIONS.map((p) => (
            <View
              key={p.name}
              style={[styles.perm, { borderColor: t.border, backgroundColor: t.card }]}>
              <Text style={{ fontFamily: MONO, fontSize: 13, color: t.ink }}>{p.name}</Text>
              <Text style={{ fontSize: 13, color: t.ink3 }}>{p.text}</Text>
            </View>
          ))}
        </View>
      </Section>

      <Section tag="During the beta" heading="Build from source today.">
        <Card>
          <Body>
            Run Shoal from source with <Text style={{ fontFamily: MONO }}>npm run dev</Text> and drop
            your plugin folder into the plugins directory or use Load Unpacked Plugin. Development
            builds load unsigned plugins. Installed releases only load plugins signed with the Shoal
            key, so third-party plugins cannot be shared with users yet.
          </Body>
        </Card>
        <View style={styles.ctaRow}>
          <Button label="Read the plugin guide" icon="book-open-variant" url={docsUrl()} />
          <Button
            label="Contributing guide"
            icon="source-pull"
            variant="ghost"
            url={ghUrl('/blob/master/CONTRIBUTING.md')}
          />
        </View>
      </Section>

      <Section tag="Planned for 1.0" heading="Publishing and a plugin marketplace.">
        <View style={{ gap: 10, marginTop: 4 }}>
          <Bullet icon="clock-outline">A marketplace inside the app to find and install plugins</Bullet>
          <Bullet icon="clock-outline">
            Signing for third-party plugins so users can install them safely
          </Bullet>
          <Bullet icon="clock-outline">
            Free and paid plugins, with developers keeping most of every sale
          </Bullet>
        </View>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  head: {
    ...CONTAINER,
    paddingHorizontal: 20,
    gap: 10,
  },
  perms: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  perm: {
    flexGrow: 1,
    flexBasis: 260,
    gap: 4,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  ctaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
});
