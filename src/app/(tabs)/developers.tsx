import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Body, Bullet, Button, Card, CodeBlock, MONO, Section, Subtitle, Title } from '@/components/ui';
import { ghUrl } from '@/config';
import { useTheme } from '@/theme';

const KEY = '#93c5fd';
const STR = '#86efac';
const COMMENT = '#64748b';

const MANIFEST = [
  { text: '// plugin.json', color: COMMENT },
  { text: '{' },
  { text: '  "id": "my-first-plugin"', color: KEY },
  { text: '  "name": "My First Plugin"', color: KEY },
  { text: '  "version": "1.0.0"', color: KEY },
  { text: '  "entry": "index.js"', color: KEY },
  { text: '  "renderer": "renderer.js"', color: KEY },
  { text: '  "permissions": ["kubernetes", "notifications"]', color: STR },
  { text: '  "license": { "type": "paid" }', color: STR },
  { text: '}' },
];

const PERMISSIONS = ['kubernetes', 'filesystem', 'network', 'ui', 'storage', 'notifications'];

export default function DevelopersScreen() {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ backgroundColor: t.bg }}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 48 }}>
      <View style={styles.head}>
        <Title style={{ fontSize: 28, lineHeight: 34 }}>For plugin developers</Title>
        <Subtitle>
          Build a plugin in an afternoon. Publish it the same day — free or paid. The app is open
          source; developers earn through the marketplace, the way Odoo apps do.
        </Subtitle>
      </View>

      <Section tag="How it works" heading="A plugin is a small JS bundle.">
        <Body>
          A Node module for cluster access plus a sandboxed UI. Declare the permissions you need in
          the manifest, sign the bundle, and publish to the marketplace.
        </Body>
        <View style={{ gap: 10, marginTop: 4 }}>
          <Bullet>Register sidebar items, pages, resource actions, and notifications</Bullet>
          <Bullet>Permission-gated capabilities — users see exactly what a plugin can do</Bullet>
          <Bullet>Licensing, trials, and payments handled by the marketplace backend</Bullet>
          <Bullet>Ship free plugins, one-time purchases, or subscriptions</Bullet>
        </View>
        <CodeBlock lines={MANIFEST} />
      </Section>

      <Section tag="Permissions" heading="Six capabilities, all opt-in.">
        <Body>
          Plugins run sandboxed and only reach what the manifest declares. The validator rejects
          anything outside this allowlist:
        </Body>
        <View style={styles.perms}>
          {PERMISSIONS.map((p) => (
            <View key={p} style={[styles.perm, { borderColor: t.border, backgroundColor: t.card }]}>
              <Text style={{ fontFamily: MONO, fontSize: 13, color: t.ink2 }}>{p}</Text>
            </View>
          ))}
        </View>
      </Section>

      <Section tag="Publish & earn" heading="Open core, sustainable marketplace.">
        <Card>
          <Body>
            The desktop app is free and open source (LGPL-3.0). Like Odoo's app store, the
            marketplace is how the ecosystem sustains itself: developers publish free or commercial
            plugins, the marketplace handles checkout, license keys, trials, and signed
            distribution, and developers keep the majority of every sale through Stripe Connect
            payouts.
          </Body>
        </Card>
        <View style={{ gap: 10, marginTop: 4 }}>
          <Bullet>Register as a developer and publish through the marketplace API</Bullet>
          <Bullet>Every version is reviewed and signed before it reaches users</Bullet>
          <Bullet>Stripe Connect onboarding for payouts — no invoicing on your side</Bullet>
        </View>
        <View style={styles.ctaRow}>
          <Button label="Read the plugin docs" icon="book-open-variant" url={ghUrl('#readme')} />
          <Button label="Contributing guide" icon="source-pull" variant="ghost" url={ghUrl('/blob/master/CONTRIBUTING.md')} />
        </View>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  head: {
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
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  ctaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
});
