import { useEffect, useState } from "react";
import {
	createStyles,
	Table,
	ScrollArea,
	UnstyledButton,
	Group,
	Text,
	Center,
	TextInput,
	Button,
  Badge,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import {
	IconSelector,
	IconChevronDown,
	IconChevronUp,
	IconSearch,
} from "@tabler/icons";
import useSWR from 'swr';

const useStyles = createStyles((theme) => ({
	th: {
		padding: "0 !important",
	},

	control: {
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},
	},

	icon: {
		width: 21,
		height: 21,
		borderRadius: 21,
	},
}));

interface RowData {
	name: string;
	license: string;
	steam_id: string;
	role: string;
	added_date: string;
	added_by: string;
}

interface ThProps {
	children: React.ReactNode;
	reversed: boolean;
	sorted: boolean;
	onSort(): void;
}

const getRoleBadge = (role: string) => {
  switch (role) {
    case 'ROOT':
      return <Badge variant="dot" color="orange">{role}</Badge>
  
    case 'ADMIN':
      return <Badge variant="dot" color="red">{role}</Badge>

    case 'MOD':
      return <Badge variant="dot" color="blue">{role}</Badge>
    default:
      return <Badge>{role}</Badge>
  }
}

const Th = ({ children, reversed, sorted, onSort }: ThProps) => {
	const { classes } = useStyles();
	const Icon = sorted
		? reversed
			? IconChevronUp
			: IconChevronDown
		: IconSelector;
	return (
		<th className={classes.th}>
			<UnstyledButton onClick={onSort} className={classes.control}>
				<Group position="apart">
					<Text weight={500} size="sm">
						{children}
					</Text>
					<Center className={classes.icon}>
						<Icon size={14} stroke={1.5} />
					</Center>
				</Group>
			</UnstyledButton>
		</th>
	);
};

const filterData = (data: RowData[], search: string) => {
	const query = search.toLowerCase().trim();
	return data.filter((item) =>
		keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
	);
};

const sortData = (
	data: RowData[],
	payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) => {
	const { sortBy } = payload;

	if (!sortBy) {
		return filterData(data, payload.search);
	}

	return filterData(
		[...data].sort((a, b) => {
			if (payload.reversed) {
				return b[sortBy].localeCompare(a[sortBy]);
			}

			return a[sortBy].localeCompare(b[sortBy]);
		}),
		payload.search
	);
};

const useFormattedDate = (date: string) => {
  const [formattedDate, setFormattedDate] =useState('');

  useEffect(
    () => setFormattedDate(new Date(date).toLocaleString("sv-SE")),
    []
  );

  return formattedDate;
};

const AdminTable = () => {
  const { data } = useSWR('/api/admin/fetch-admins');

	const [search, setSearch] = useState("");
	const [sortedData, setSortedData] = useState(data);
	const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
	const [reverseSortDirection, setReverseSortDirection] = useState(false);

  useEffect(() => {
    setSortedData(data)
  }, [data])

	const setSorting = (field: keyof RowData) => {
		const reversed = field === sortBy ? !reverseSortDirection : false;
		setReverseSortDirection(reversed);
		setSortBy(field);
		setSortedData(sortData(data, { sortBy: field, reversed, search }));
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;
		setSearch(value);
		setSortedData(
			sortData(data, {
				sortBy,
				reversed: reverseSortDirection,
				search: value,
			})
		);
	};

	const rows = sortedData?.map((row: RowData) => (
		<tr key={row.name}>
			<td>{row.name}</td>
			<td>{getRoleBadge(row.role)}</td>
			<td>{useFormattedDate(row.added_date)}</td>
			<td>{row.added_by}</td>
			<td>
				<Button variant="outline">Ta bort</Button>
			</td>
		</tr>
	));

	return (
		<ScrollArea>
      <Group grow>
        <TextInput
          placeholder="Sök efter administratör"
          ml="sm"
          mb="md"
          icon={<IconSearch size={14} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
          sx={{ minWidth: '60%' }}
        />

        <Button mb="md" mr="sm" variant="outline">Lägg till ny</Button>
      </Group>
			<Table
				horizontalSpacing="md"
				verticalSpacing="xs"
			>
				<thead>
					<tr>
						<Th
							sorted={sortBy === "name"}
							reversed={reverseSortDirection}
							onSort={() => setSorting("name")}
						>
							Namn
						</Th>
						<th>Roll</th>
						<th>Tillagd</th>
						<th>Tillagd utav</th>
            <th>Hantera</th>
					</tr>
				</thead>
				<tbody>
					{rows?.length > 0 ? (
						rows
					) : (
						<tr>
							<td colSpan={0}>
								<Text weight={500} align="center">
									Inga resultat
								</Text>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</ScrollArea>
	);
};

export { AdminTable };
