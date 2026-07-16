import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Body,
  Bullet,
  Button,
  Card,
  Chip,
  CONTAINER,
  IconBadge,
  MONO,
  Section,
  Subtitle,
  Title,
} from '@/components/ui';
import { CONFIG, ghUrl } from '@/config';
import { useTheme } from '@/theme';

const FEATURES = [
  {
    icon: 'cube-outline',
    title: 'One-click clusters',
    text: 'Spin up local clusters with kind, minikube, or k3d. Switch contexts in a dropdown. Delete them just as easily.',
  },
  {
    icon: 'eye-outline',
    title: 'Live resource explorer',
    text: 'Browse Pods, Services, Deployments, Ingresses, and every other resource with live status and YAML inspection.',
  },
  {
    icon: 'console',
    title: 'Logs & built-in terminal',
    text: 'Tail container logs in real time, attach a shell to any pod, and run kubectl without leaving the app.',
  },
  {
    icon: 'connection',
    title: 'Port forwarding',
    text: 'Forward any service or pod to localhost in one click, and manage every active forward from a single panel.',
  },
  {
    icon: 'file-code-outline',
    title: 'Manifest editor',
    text: 'Write, validate, and apply YAML manifests from an editor that knows your cluster.',
  },
  {
    icon: 'shield-check-outline',
    title: 'Secure by default',
    text: 'Sandboxed renderer, signed plugins, local-first storage. Your credentials never leave your machine.',
  },
] as const;

const TOOLS = [
  { icon: 'docker', label: 'Docker' },
  { icon: 'circle-double', label: 'kind' },
  { icon: 'hexagon-outline', label: 'minikube' },
  { icon: 'cube-outline', label: 'k3d' },
  { icon: 'package-variant-closed', label: 'Helm' },
  { icon: 'source-branch', label: 'Argo CD' },
  { icon: 'console-line', label: 'kubectl' },
] as const;

const STEPS = [
  {
    num: '01',
    title: 'Install',
    text: 'Grab the installer for Windows, macOS, or Linux from GitHub Releases and run it.',
  },
  {
    num: '02',
    title: 'Connect or create',
    text: 'The app picks up your kubeconfig automatically — or create a local cluster with kind, minikube, or k3d.',
  },
  {
    num: '03',
    title: 'Extend',
    text: 'Open the built-in marketplace and install plugins. The core app and free plugins cost nothing.',
  },
] as const;

const ARCH = [
  {
    icon: 'chip',
    title: 'Main process',
    text: 'Electron main runs the app lifecycle and brokers every OS call — docker, kubectl, kind — through a typed IPC bridge.',
  },
  {
    icon: 'view-grid-outline',
    title: 'Renderer UI',
    text: 'A sandboxed React 19 app powered by Vite, Tailwind v4, and React Router. No Node APIs, no fs, no escape.',
  },
  {
    icon: 'puzzle-outline',
    title: 'Plugin runtime',
    text: 'Plugins are signed bundles with declared permissions, delivered through the open marketplace.',
  },
] as const;

export default function HomeScreen() {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ backgroundColor: t.bg }}
      contentContainerStyle={{ paddingTop: insets.top + 28, paddingBottom: 48 }}>
      {/* Hero */}
      <View style={styles.hero}>
        <View style={[styles.eyebrow, { borderColor: t.border, backgroundColor: t.card }]}>
          <View style={[styles.pill, { backgroundColor: t.primarySoft }]}>
            <Text style={{ color: t.primary, fontSize: 12, fontWeight: '600' }}>
              v{CONFIG.appVersion}
            </Text>
          </View>
          <Text style={{ color: t.ink2, fontSize: 13 }}>Open source · LGPL-3.0 · local-first</Text>
        </View>
        <Title style={{ textAlign: 'center' }}>
          The desktop app for <Text style={{ color: t.primary }}>Kubernetes</Text>,{'\n'}with a
          plugin marketplace.
        </Title>
        <Subtitle style={{ textAlign: 'center' }}>
          Ship, inspect, and operate Kubernetes clusters from a single desktop app. Free and open
          source — extended by a marketplace of community and commercial plugins, the way Odoo does
          it.
        </Subtitle>
        <View style={styles.ctaRow}>
          <Button label="Download" icon="download" url={ghUrl('/releases/latest')} />
          <Button label="Star on GitHub" icon="github" variant="ghost" url={ghUrl()} />
        </View>
        <Body style={{ textAlign: 'center' }}>Windows 10+ · macOS · Linux (deb · AppImage)</Body>
      </View>

      {/* Works with */}
      <View style={styles.tools}>
        {TOOLS.map((tool) => (
          <Chip key={tool.label} icon={tool.icon} label={tool.label} />
        ))}
      </View>

      {/* Features */}
      <Section tag="Core features" heading="Everything you need to operate Kubernetes, locally.">
        <Body>
          A single, fast, native desktop app — no browser tabs, no half-finished web dashboards.
        </Body>
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

      {/* Lifecycle */}
      <Section tag="Cluster lifecycle" heading="Everything kubectl does, without memorizing flags.">
        <View style={{ gap: 10, marginTop: 4 }}>
          <Bullet>Create and delete kind, minikube, and k3d clusters from the app</Bullet>
          <Bullet>Multi-cluster context switcher with live health checks</Bullet>
          <Bullet>Works offline — no telemetry, no login, no cloud account</Bullet>
          <Bullet>
            Kubeconfig stays in <Text style={{ fontFamily: MONO }}>~/.kube/config</Text>
          </Bullet>
          <Bullet>Auto-updates keep the app current</Bullet>
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
          label="Download the latest release"
          icon="download"
          url={ghUrl('/releases/latest')}
          style={{ marginTop: 6 }}
        />
      </Section>

      {/* Footer */}
      <View style={[styles.footer, { borderTopColor: t.border }]}>
        <MaterialCommunityIcons name="ship-wheel" size={22} color={t.ink3} />
        <Body style={{ textAlign: 'center' }}>
          © 2026 Kubernetes Desktop contributors · LGPL-3.0-or-later
        </Body>
        <View style={styles.ctaRow}>
          <Button label="GitHub" icon="github" variant="ghost" url={ghUrl()} />
          <Button label="Issues" icon="bug-outline" variant="ghost" url={ghUrl('/issues')} />
        </View>
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
});
