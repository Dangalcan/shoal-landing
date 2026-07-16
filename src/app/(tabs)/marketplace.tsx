import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Body, Card, PriceTag, Subtitle, Title } from '@/components/ui';
import { CATEGORIES, CATEGORY_STYLE, Plugin } from '@/data/catalog';
import { CatalogResult, fetchCatalog } from '@/lib/marketplace';
import { useTheme } from '@/theme';

export default function MarketplaceScreen() {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  const [catalog, setCatalog] = useState<CatalogResult | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');

  const load = useCallback(async () => {
    const result = await fetchCatalog();
    setCatalog(result);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const plugins = useMemo(() => {
    const all = catalog?.plugins ?? [];
    const q = query.trim().toLowerCase();
    return all.filter((p) => {
      const matchCat = category === 'all' || p.category === category;
      const matchText =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchCat && matchText;
    });
  }, [catalog, query, category]);

  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top + 16 }}>
      <View style={styles.head}>
        <Title style={{ fontSize: 28, lineHeight: 34 }}>Marketplace</Title>
        <Subtitle>
          A plugin for every cluster chore — free community plugins and commercial ones, signed and
          sandboxed. Open source at the core, sustained Odoo-style by its marketplace.
        </Subtitle>
        {catalog ? (
          <Body>
            {catalog.plugins.length} plugins ·{' '}
            {catalog.source === 'live' ? 'live catalog' : 'bundled snapshot (backend offline)'}
          </Body>
        ) : (
          <Body>Loading catalog…</Body>
        )}

        <View style={[styles.search, { borderColor: t.border, backgroundColor: t.card }]}>
          <MaterialCommunityIcons name="magnify" size={17} color={t.ink4} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search plugins…"
            placeholderTextColor={t.ink4}
            accessibilityLabel="Search plugins"
            style={[styles.searchInput, { color: t.ink }]}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }}>
          <View style={styles.cats}>
            {['all', ...CATEGORIES].map((c) => {
              const on = category === c;
              return (
                <Pressable
                  key={c}
                  accessibilityRole="button"
                  onPress={() => setCategory(c)}
                  style={[
                    styles.cat,
                    {
                      borderColor: on ? t.ink : t.border,
                      backgroundColor: on ? (t.dark ? '#f1f5f9' : '#0f172a') : t.card,
                    },
                  ]}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '500',
                      color: on ? (t.dark ? '#0f172a' : '#ffffff') : t.ink2,
                    }}>
                    {c === 'all' ? 'All' : c}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <FlatList
        data={plugins}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          catalog ? (
            <Body style={{ textAlign: 'center', paddingTop: 32 }}>
              No plugins match your search.
            </Body>
          ) : null
        }
        renderItem={({ item }) => <PluginCard plugin={item} />}
      />
    </View>
  );
}

function PluginCard({ plugin }: { plugin: Plugin }) {
  const t = useTheme();
  const style = CATEGORY_STYLE[plugin.category] ?? {
    icon: 'puzzle-outline',
    color: t.primary,
    soft: t.primarySoft,
  };
  return (
    <Card style={styles.plugin}>
      <View style={styles.pluginTop}>
        <View style={[styles.pluginIc, { backgroundColor: style.soft }]}>
          <MaterialCommunityIcons
            name={style.icon as keyof typeof MaterialCommunityIcons.glyphMap}
            size={24}
            color={style.color}
          />
        </View>
        <PriceTag price={plugin.price} />
      </View>
      <Text style={[styles.pluginName, { color: t.ink }]}>{plugin.name}</Text>
      <Body style={{ fontSize: 12 }}>
        by {plugin.author} · v{plugin.version}
      </Body>
      <Body>{plugin.description}</Body>
      <Text style={[styles.pluginCat, { color: t.ink3 }]}>{plugin.category.toUpperCase()}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  head: {
    paddingHorizontal: 20,
    gap: 10,
    paddingBottom: 12,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    minHeight: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 10,
  },
  cats: {
    flexDirection: 'row',
    gap: 8,
  },
  cat: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 12,
  },
  plugin: {
    gap: 6,
  },
  pluginTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  pluginIc: {
    width: 44,
    height: 44,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pluginName: {
    fontSize: 16,
    fontWeight: '700',
  },
  pluginCat: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.6,
    marginTop: 4,
  },
});
