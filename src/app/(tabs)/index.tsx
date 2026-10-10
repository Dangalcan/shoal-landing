import Head from 'expo-router/head';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Body,
  Bullet,
  Button,
  Card,
  Chip,
  CONTAINER,
  IconBadge,
  Logo,
  MONO,
  Notice,
  Section,
  Subtitle,
  Title,
} from '@/components/ui';
import { CONFIG, docsUrl, ghUrl, releasesUrl } from '@/config';
import { useTheme } from '@/theme';

const SCREENSHOTS = {
  dashboard: {
    light: require('@/assets/screenshots/dashboard-light.webp'),
    dark: require('@/assets/screenshots/dashboard-dark.webp'),
    label: 'Dashboard with Docker status, the active context and your clusters',
  },
  details: {
    light: require('@/assets/screenshots/cluster-details-light.webp'),
    dark: require('@/assets/screenshots/cluster-details-dark.webp'),
    label: 'Pods of a local kind cluster',
  },
  manifests: {
    light: require('@/assets/screenshots/manifests-light.webp'),
    dark: require('@/assets/screenshots/manifests-dark.webp'),
    label: 'Manifest library',
  },
  plugins: {
    light: require('@/assets/screenshots/plugins-light.webp'),
    dark: require('@/assets/screenshots/plugins-dark.webp'),
    label: 'The two bundled example plugins',
  },
} as const;

const FEATURES = [
  {
    icon: 'cube-outline',
    title: 'Local clusters',
    text: 'Create and delete local clusters with kind or k3d. Switch between every context in your kubeconfig from a dropdown.',
  },
  {
    icon: 'eye-outline',
    title: 'Resource browser',
    text: 'Browse Pods, Deployments, Services, ConfigMaps and more in any namespace. Inspect YAML, restart rollouts, scale and delete.',
  },
  {
    icon: 'console',
    title: 'Logs and terminal',
    text: 'Read recent container logs, run commands inside a pod, and use kubectl or any local tool from the built-in terminal.',
  },
  {
    icon: 'connection',
    title: 'Port forwarding',
    text: 'Forward a service or pod to localhost in one click and manage every active forward from a single panel.',
  },
  {
    icon: 'file-code-outline',
    title: 'Manifest library',
    text: 'Write and organise YAML manifests in folders, start from templates, and apply them to the active cluster in one click.',
  },
  {
    icon: 'swap-horizontal',
    title: 'Compose migration',
    text: 'Turn a Docker Compose file into Kubernetes manifests with kompose. They land in your manifest library, ready to review and apply.',
  },
] as const;

const TOOLS = [
  { icon: 'console-line', label: 'kubectl' },
  { icon: 'circle-double', label: 'kind' },
  { icon: 'cube-outline', label: 'k3d' },
  { icon: 'docker', label: 'Docker' },
  { icon: 'swap-horizontal', label: 'kompose' },
] as const;

const STEPS = [
  {
    num: '01',
    title: 'Install',
    text: 'Download the Windows installer or the Linux AppImage from GitHub Releases and run it.',
  },
  {
    num: '02',
    title: 'Connect or create',
    text: 'Shoal reads your kubeconfig, or creates a local cluster with kind or k3d.',
  },
  {
    num: '03',
    title: 'Extend',
    text: 'Two example plugins come enabled. Build your own with the plugin guide.',
  },
] as const;

const ARCH = [
  {
    icon: 'chip',
    title: 'Main process',
    text: 'Electron main runs the app lifecycle and brokers every OS call, from docker to kubectl and kind, through a typed IPC bridge.',
  },
  {
    icon: 'view-grid-outline',
    title: 'Renderer UI',
    text: 'A sandboxed React 19 app built with Vite, Tailwind v4 and React Router. No Node APIs and no file system access.',
  },
  {
    icon: 'puzzle-outline',
    title: 'Plugin runtime',
    text: 'Plugin UI runs in a sandboxed frame with only the permissions its manifest declares. Installed plugins run their Node code in a separate process. The bundled examples are signed.',
  },
] as const;

const DOWNLOADS = [
  {
    icon: 'microsoft-windows',
    title: 'Windows 10 and 11',
    items: [
      'Installer with automatic updates',
      'Portable .exe that needs no install and does not update itself',
    ],
  },
  {
    icon: 'linux',
    title: 'Linux',
    items: ['AppImage with automatic updates', '.deb package for Debian and Ubuntu'],
  },
] as const;

export default function HomeScreen() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  // The frame sets the 16:9 box. On web an Image without an explicit width
  // and height takes the file's intrinsic size instead.
  const shot = (key: keyof typeof SCREENSHOTS) => (
    <View style={[styles.shot, { borderColor: t.border }]}>
      <Image
        source={t.dark ? SCREENSHOTS[key].dark : SCREENSHOTS[key].light}
        accessibilityLabel={SCREENSHOTS[key].label}
        style={styles.shotImage}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <ScrollView
      style={{ backgroundColor: t.bg }}
      contentContainerStyle={{ paddingTop: insets.top + 28, paddingBottom: 48 }}>
      <Head>
        <title>{CONFIG.siteTitle}</title>
        <link rel="canonical" href={CONFIG.siteUrl} />
      </Head>

      {/* Hero */}
      <View style={styles.hero}>
        <Logo size={72} />
        <View style={[styles.eyebrow, { borderColor: t.border, backgroundColor: t.card }]}>
          <View style={[styles.pill, { backgroundColor: t.primarySoft }]}>
            <Text style={{ color: t.primary, fontSize: 12, fontWeight: '600' }}>
              v{CONFIG.appVersion} beta
            </Text>
          </View>
          <Text style={{ color: t.ink2, fontSize: 13 }}>Open source · LGPL-3.0 · local-first</Text>
        </View>
        <Title style={{ textAlign: 'center' }}>
          A desktop app for your{'\n'}
          <Text style={{ color: t.primary }}>Kubernetes</Text> clusters.
        </Title>
        <Subtitle style={{ textAlign: 'center' }}>
          Create local clusters, browse resources, apply manifests and forward ports from one
          native app. Free and open source, with sandboxed plugins.
        </Subtitle>
        <View style={styles.ctaRow}>
          <Button label="Download" icon="download" url={releasesUrl()} />
          <Button label="Star on GitHub" icon="github" variant="ghost" url={ghUrl()} />
        </View>
        <Body style={{ textAlign: 'center' }}>Windows 10+ · Linux (AppImage · deb)</Body>
      </View>

      {/* Works with */}
      <View style={styles.tools}>
        {TOOLS.map((tool) => (
          <Chip key={tool.label} icon={tool.icon} label={tool.label} />
        ))}
      </View>

      {/* Screenshots */}
      <Section tag="Screenshots" heading="See it before you install it.">
        {shot('dashboard')}
        <View style={styles.grid}>
          <View style={styles.gridShot}>{shot('details')}</View>
          <View style={styles.gridShot}>{shot('manifests')}</View>
          <View style={styles.gridShot}>{shot('plugins')}</View>
        </View>
      </Section>

      {/* Features */}
      <Section tag="Core features" heading="Everything you need for local Kubernetes work.">
        <Body>A single native desktop app. No browser tabs and no half-finished web dashboards.</Body>
        <View style={styles.grid}>
          {FEATURES.map((f) => (
            <Card key={f.title} style={styles.gridCard}>
              <IconBadge icon={f.icon} color={t.primary} background={t.primarySoft} />
              <Text style={[styles.cardTitle, { color: t.ink }]}>{f.title}</Text>
              <Body>{f.text}</Body>
            </Card>
          ))}
        </View>
      </Section>

      {/* Local first */}
      <Section tag="Local first" heading="Your clusters, your machine, nothing else.">
        <View style={{ gap: 10, marginTop: 4 }}>
          <Bullet>Works offline with no telemetry, no login and no cloud account</Bullet>
          <Bullet>
            Reads your kubeconfig from <Text style={{ fontFamily: MONO }}>~/.kube/config</Text> or a
            path you choose, and remembers it
          </Bullet>
          <Bullet>Errors go to a local log that you can open from Settings</Bullet>
          <Bullet>The Windows installer and the AppImage keep themselves up to date</Bullet>
        </View>
      </Section>

      {/* Architecture */}
      <Section tag="Architecture" heading="Native desktop. Sandboxed plugins. Zero cloud.">
        <View style={styles.grid}>
          {ARCH.map((a) => (
            <Card key={a.title} style={styles.gridCard}>
              <IconBadge icon={a.icon} color={t.primary} background={t.primarySoft} size={36} />
              <Text style={[styles.cardTitle, { color: t.ink }]}>{a.title}</Text>
              <Body>{a.text}</Body>
            </Card>
          ))}
        </View>
      </Section>

      {/* Quickstart */}
      <Section tag="Quickstart" heading="From download to cluster in three steps.">
        <View style={styles.grid}>
          {STEPS.map((s) => (
            <Card key={s.num} style={styles.gridCard}>
              <Text style={{ fontFamily: MONO, fontSize: 12, fontWeight: '700', color: t.primary }}>
                STEP {s.num}
              </Text>
              <Text style={[styles.cardTitle, { color: t.ink }]}>{s.title}</Text>
              <Body>{s.text}</Body>
            </Card>
          ))}
        </View>
        <Button
          label="Read the plugin guide"
          icon="book-open-variant"
          variant="ghost"
          url={docsUrl()}
          style={{ marginTop: 6, alignSelf: 'flex-start' }}
        />
      </Section>

      {/* Download */}
      <Section tag="Download" heading="Get the beta.">
        <Body>
          Version {CONFIG.appVersion} is a public beta for 64-bit Windows and Linux. macOS, the
          plugin marketplace and code-signed installers are planned for 1.0.
        </Body>
        <View style={styles.grid}>
          {DOWNLOADS.map((d) => (
            <Card key={d.title} style={styles.gridCard}>
              <IconBadge icon={d.icon} color={t.primary} background={t.primarySoft} />
              <Text style={[styles.cardTitle, { color: t.ink }]}>{d.title}</Text>
              <View style={{ gap: 8 }}>
                {d.items.map((item) => (
                  <Bullet key={item}>{item}</Bullet>
                ))}
              </View>
            </Card>
          ))}
        </View>
        <Notice icon="shield-alert-outline">
          The installers are not code signed yet. Windows SmartScreen may say &quot;Windows protected
          your PC&quot;. Choose More info, then Run anyway.
        </Notice>
        <Body>
          You need kubectl on your PATH. Docker is only needed to create local kind or k3d
          clusters.
        </Body>
        <Button
          label="Download the latest release"
          icon="download"
          url={releasesUrl()}
          style={{ marginTop: 6, alignSelf: 'flex-start' }}
        />
      </Section>

      {/* Footer */}
      <View style={[styles.footer, { borderTopColor: t.border }]}>
        <Logo size={28} />
        <Body style={{ textAlign: 'center' }}>
          © 2026 Daniel Galván Cancio and the Shoal contributors · LGPL-3.0-or-later
        </Body>
        <View style={styles.ctaRow}>
          <Button label="GitHub" icon="github" variant="ghost" url={ghUrl()} />
          <Button label="Issues" icon="bug-outline" variant="ghost" url={ghUrl('/issues')} />
        </View>
        <Text style={[styles.legal, { color: t.ink4 }]}>
          Kubernetes is a registered trademark of The Linux Foundation. Shoal is an independent
          project and is not affiliated with or endorsed by The Linux Foundation or the Cloud
          Native Computing Foundation.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    ...CONTAINER,
    maxWidth: 900,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 18,
  },
  eyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 5,
    paddingLeft: 5,
    paddingRight: 14,
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  ctaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  tools: {
    ...CONTAINER,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 6,
  },
  gridCard: {
    flexGrow: 1,
    flexBasis: 260,
  },
  gridShot: {
    flexGrow: 1,
    flexBasis: 300,
  },
  shot: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  shotImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    ...CONTAINER,
    marginTop: 48,
    borderTopWidth: 1,
    paddingTop: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 12,
  },
  legal: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    maxWidth: 640,
  },
});
